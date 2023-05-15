const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app/tider";

function showPreformanceForm() {
  console.log("preformance form is active");

  //Funktion som skaber forms via DOM.
  visualizePreformanceDialog();

  //Event der aktiveres når sbumit klikkes.
  document
    .querySelector("#time-result-form")
    .addEventListener("submit", submitNewPreformance);
}

// Jeg vil gerne have en data-list så man kan vælge stævner eller tilføje et...
function visualizePreformanceDialog() {
  const dialogHTML =
    /*html*/
    `
  <form id="time-result-form">
  <legend>Svømmetid</legend>
  <lable for="svomme_decilpin">Deciplin</lable>
  <select id="svomme_decilpin" name="svomme_decilpin">
  <option value="crawl" selected>Crawl</option>
  <option value="butterfly">Butterfly</option>
  <option value="bryst">Brystsvømning</option>
  <option value="rygcrawl">Rygcrawl</option>
  </select>
  <lable for="svomme_id">SvømmerID</lable>
  <input type="text" id="svomme_id" name="svomme_id" required placeholder="angiv korrekt id"> 
  <lable for="svomme-resultat">Tid-Resultat</lable>
  <input type="text" id="svomme_resultat" name="svomme_resultat" required placeholder="Min-Sek-TiSek-HunSek">
  <lable for="svomme_dato">Dato</lable>
  <input type="text" id="svomme_dato" name="svomme_dato" onsubmit=return validateFormsDate() method="post" required placeholder="ÅÅÅÅ-MM-DD">
  <legend>Stævne</legend>
  <lable for="staevne_navn">Stævnets Navn</lable>
  <input type="text" id="staevne_navn" name="staevne_navn" placeholder="stævnetsNavn-årstal">
  <lable for="staevne_resultat">Pladsering</lable>
  <input type="text" id="staevne_resultat" name="staevne_resultat" placeholder="No.">

    
  <button id="btn-submit-result-time">opret</button>
  </form>
  `;

  document
    .querySelector("#traener-side")
    .insertAdjacentHTML("beforeend", dialogHTML);
}

//------------ Validering af forms--------------
function validateFormsDate() {
  console.log("hey");
  alert("validated");
}

//Når submit-trykkes
function submitNewPreformance(event) {
  event.preventDefault();

  const form = event.target;

  const resultData = {
    deciplin: form.svomme_decilpin.value,
    
  };

  postNewResult();
}

async function postNewResult() {
  const resultPromise = await fetch(`${endpoint}/tider.js`);
  const resultData = await JSON.resultPromise.stringify();
}

export { showPreformanceForm };
