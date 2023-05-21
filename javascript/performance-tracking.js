import { updateMemberGrid } from "./getMembers.js";


//MANGLER EN UPDATE FUNKTION!!!!!


let medlemmer;

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

function showPerformanceForm() {
  console.log("preformance form is active");

  //Funktion som skaber forms via DOM.
  visualizePreformanceDialog();
  addInputFunctionalities();
  // Datalisten skal kunne give ID som value. Det ved jeg ikke hvordan jeg får på stående fod.
  // memberDatalistGetData();
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
}

// Jeg vil gerne have en data-list så man kan vælge stævner eller tilføje et...
//spørg maskinen...
function visualizePreformanceDialog() {
  const dialogHTML =
    /*html*/
    `
  <form id="time-result-form">
    <legend>Svømmetid</legend>
 <div class="result-form-element">
  <lable for="svomme_decilpin">Deciplin</lable>
  <select id="svomme_decilpin" name="svomme_decilpin">
  <option value="crawl" selected>Crawl</option>
  <option value="butterfly">Butterfly</option>
  <option value="bryst">Brystsvømning</option>
  <option value="rygcrawl">Rygcrawl</option>
  </select>

  <lable for="svomme_id">SvømmerID</lable>
  <input type="text" id="svomme_id" name="svomme_id" list="medlems-liste" required placeholder="angiv korrekt id"> 
 
 <datalist id=medlems-liste>
 </datalist>
 
 </div> 
 <legen>Resultat</legen>
  <div class="result-form-element">

  <lable for="resultat_min">Minutter</lable>
  <input type="text" id="resultat_min" name="resultat_min" pattern="[0-9]{2}"  placeholder="MM" required>
  <lable for ="resultat_sek">Sekunder</lable>
<input type="text" id="resultat_sek" name="resultat_sek" pattern="[0-9]{2}" placeholder="SS" required>
<lable for="resultat_hsek">Hundredele Sekunder</lable>
<input type="text" id="resultat_hsek" name="resultat_hsek" pattern="[0-9]{2}" placeholder="HH" require> 
</div>


  <legend>Dato</legend>
 <div class="result-form-element">
  <lable for="resultat_aar">År</lable>
  <input type="text" id="resultat_aar" name="resultat_aar" pattern="[0-9]{4}" placeholder="ÅÅÅÅ" required >
  
  <lable for="resultat_maaned" >Måned</lable>
  <select id="resultat_maaned" name="resultat_maaned">
  <option value="01">Januar</option>
  <option value="02">Februar</option>
  <option value="03">Marts</option>
  <option value="04">April</option>
  <option value="05">Maj</option>
  <option value="06">Juni</option>
  <option value="07">Juli</option>
  <option value="08">August</option>
  <option value="09">Oktober</option>
  <option value="10">September</option>
  <option value="11">November</option>
  <option value="12">December</option>
</select>

 <lable for="resultat_dag">dag</lable>
 <select id="resultat_dag" name="resultat_dag">
 <option value="01">01</option>
 <option value="02">02</option>
 <option value="03">03</option>
 <option value="04">04</option>
 <option value="05">05</option>
 <option value="06">06</option>
 <option value="07">07</option>
 <option value="08">08</option>
 <option value="09">09</option>
  <option value="10">10</option>
  <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
  <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option id="skudaar" value="29">29</option>
 <option id="kortMaaned" value="30">30</option>
 <option id="langMaaned" value="31">31</option>
 </select>
</div>


  <legend>Stævne</legend>
    <div class="result-form-element">
  <lable for="staevne_navn">Stævnets Navn</lable>
  <input type="text" id="staevne_navn" name="staevne_navn" placeholder="stævnetsNavn-årstal">
  <lable for="staevne_resultat">Pladsering</lable>
  <input type="text" id="staevne_resultat" name="staevne_resultat" placeholder="No.">
</div>

  <button type="submit" id="btn-submit-result-time">opret</button>
  </form>
  `;

  //Hvor prestation formen vises
  document
    .querySelector("#nyt-resultat")
    .insertAdjacentHTML("beforeend", dialogHTML);
}

const numericals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// pattern="\d{4}"

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
    dato: dateToSeconds(dateYear, dateMonth, dateDay),
    stævne: form.staevne_navn.value,
    pladsering: form.staevne_resultat.value,
  };

  function setResultPostDialogContent(result) {
    const successDialog = document.querySelector("#nyt-resultat-dialog");
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
    console.log("ny tid optrettet");
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
    // const id = medlem.target.getAttribute("data-id");
    const medlemDatalistHTML = /*html*/ `<option value=${medlem}>${medlem.navn} ${medlem.efternavn}</option>`;
    document
      .querySelector("#medlems-liste")
      .insertAdjacentHTML("beforeend", medlemDatalistHTML);
    console.log(medlemDatalistHTML);
  }
  // const y = `<option value=${medlem.navn}></option>`;
}

export { showPerformanceForm as showPerformanceForm };
