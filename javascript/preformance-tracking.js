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
  <lable for="svomme-decilpin">Deciplin</lable>
  <select id="svomme-deciplin" name="svomme-deciplin">
  <option value="crawl" selected>Crawl</option>
  <option value="butterfly">Butterfly</option>
  <option value="bryst">Brystsvømning</option>
  <option value="rygcrawl">Rygcrawl</option>
  </select>
  <lable for="svomme-id">SvømmerID</lable>
  <input type="text" id="svomme-id" name="svomme-id" required placeholder="angiv korrekt id"> 
  <lable for="svomme-resultat">Tid-Resultat</lable>
  <input type="text" id="svomme-resultat" name="svomme-resultat" required placeholder="Min-Sek-TiSek-HunSek">
  <lable for="svomme-dato">Dato</lable>
  <input type="text" id="svomme-dato" name="svomme-dato" onsubmit=return validateFormsDate() method="post" required placeholder="ÅÅÅÅ-MM-DD">
  <legend>Stævne</legend>
  <lable for="staevne-navn">Stævnets Navn</lable>
  <input type="text" id="staevne-navn" name="staevne-navn" placeholder="stævnetsNavn-årstal">
  <lable for="staevne-resultat">Pladsering</lable>
  <input type="text" id="staevne-resultat" name="staevne-resultat" placeholder="No.">

    
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
  console.log("default prevented");
}

export { showPreformanceForm };
