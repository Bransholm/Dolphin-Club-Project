import { updateMemberGrid } from "./getMembers.js";

//MANGLER EN UPDATE FUNKTION!!!!!

let medlemmer;

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

let viewResultForm = false;

function showPerformanceForm() {
  console.log("preformance form is active");

  addInputFunctionalities();
  // Datalisten skal kunne give ID som value. Det ved jeg ikke hvordan jeg får på stående fod.
  memberDatalistGetData();
}

function addInputFunctionalities() {
  //Event der aktiveres når sbumit klikkes.
  document
    .querySelector("#time-result-form")
    .addEventListener("submit", submitNewPreformance);

  //Holder øje med den måned der er valgt
  document
    .querySelector("#resultat_maaned")
    .addEventListener("change", modifyDaySelector);

  document
    .querySelector("#btn-close-dialog")
    .addEventListener("click", closeDialog);

  document
    .querySelector("#btn-toggle-result-form")
    .addEventListener("click", toggleShowResultForm);
}

//show ResultForms
function toggleShowResultForm() {
  if (viewResultForm === true) {
    document.querySelector("#time-result-form").classList.add("view-content");
    document.querySelector("#btn-toggle-result-form").textContent =
      "Tilføj Nytid";
    ("Luk formel");
    1;
    viewResultForm = false;
  } else {
    document
      .querySelector("#time-result-form")
      .classList.remove("view-content");
    document.querySelector("#btn-toggle-result-form").textContent =
      "Luk formel";

    viewResultForm = true;
  }
}

//------------ Validering af forms--------------
function dateToSeconds(year, month, day) {
  // const correctDay = validateDay(month, day);
  const resultDate = new Date(`${year}-${month}-${day}`);
  const dateInSeconds = resultDate.valueOf();
  console.log(dateInSeconds);
  return dateInSeconds;
}

function modifyDaySelector(event) {
  console.log(event.target.value);
  document.querySelector("#skudaar").classList.remove("view-content");
  document.querySelector("#kortMaaned").classList.remove("view-content");
  document.querySelector("#langMaaned").classList.remove("view-content");

  const month = event.target.value;
  if (month == "02") {
    document.querySelector("#skudaar").classList.add("view-content");
    document.querySelector("#kortMaaned").classList.add("view-content");
    document.querySelector("#langMaaned").classList.add("view-content");
  } else if (month == "04" || month == "06" || month == "09" || month == "11") {
    document.querySelector("#langMaaned").classList.add("view-content");
  }
}

function getResultTime(min, sec, cent) {
  return `${min}-${sec}-${cent}`;
}

function calculateTimeCentiseconds(min, sec, cent) {
  const minutteToSeconds = min * 60 + sec;
  const secondToCentiseconds = minutteToSeconds * 100 + cent;
  return secondToCentiseconds;
}

// --------------------------------------------------------------------
//Når submit-trykkes
function submitNewPreformance(event) {
  event.preventDefault();

  const form = event.target;
  const dateYear = form.resultat_aar.value;
  const dateMonth = form.resultat_maaned.value;
  const dateDay = form.resultat_dag.value;
  const minuttes = form.resultat_min.value;
  const seconds = form.resultat_sek.value;
  const centiseconds = form.resultat_hsek.value;

  const resultData = {
    deciplin: form.svomme_decilpin.value,
    svømmerID: form.svomme_id.value,
    tid: getResultTime(minuttes, seconds, centiseconds),
    tidCentisekunder: calculateTimeCentiseconds(
      minuttes,
      seconds,
      centiseconds
    ),
    dato: `${dateYear}-${dateMonth}-${dateDay}`,
    datoSekunder: dateToSeconds(dateYear, dateMonth, dateDay),
    stævne: form.staevne_navn.value,
    pladsering: form.staevne_resultat.value,
  };

  function setResultPostDialogContent(result) {
    document.querySelector(
      "#resultates-svommer"
    ).textContent = `Svømmer: ${result.svømmerID}`;
    document.querySelector(
      "#resultates-tid"
    ).textContent = `tid: ${minuttes}-${seconds}-${centiseconds}`;
    document.querySelector(
      "#resultates-dato"
    ).textContent = `dato: ${dateYear}-${dateMonth}-${dateDay}`;
    document.querySelector(
      "#resultates-lokation"
    ).textContent = `sted: ${result.stævne}`;
    document.querySelector(
      "#svommers-pladsering"
    ).textContent = `pladsering: ${result.pladsering}`;
  }

  setResultPostDialogContent(resultData);
  postNewResult(resultData);
}

async function postNewResult(data) {
  console.log(data);
  const url = `${endpoint}/tider.json`;
  const resultJson = await JSON.stringify(data);
  const resultPost = await fetch(url, { method: "POST", body: resultJson });
  if (resultPost.ok) {
    showResultPostDialog();
  }
}

function showResultPostDialog() {
  document.querySelector("#nyt-resultat-dialog").showModal();
}

function closeDialog() {
  document.querySelector("#nyt-resultat-dialog").close();
}

//--- DATALISTE AF MEDLEMMER?
async function memberDatalistGetData() {
  medlemmer = await updateMemberGrid();
  formDataList(medlemmer);
}

function formDataList(medlemmer) {
  for (let medlem of medlemmer) {
    if (medlem.kategori === "elite") {
      const medlemDatalistHTML = /*html*/ `<option value=${medlem.id}>${medlem.navn} ${medlem.efternavn}</option>`;
      document
        .querySelector("#medlems-liste")
        .insertAdjacentHTML("beforeend", medlemDatalistHTML);
    }
  }
}

export { showPerformanceForm as showPerformanceForm };
