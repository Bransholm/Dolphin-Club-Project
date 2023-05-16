const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

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
//spørg maskinen...
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
  
  <lable for="resultat_aar">År</lable>
  <input type="text" id="resultat_aar" name="resultat_aar" pattern="\d{4}" placeholder="ÅÅÅÅ" required >
  
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
 <option value="29">29</option>
 <option value="30">30</option>
 <option value="31">31</option>
 </select>



  <legend>Stævne</legend>
  <lable for="staevne_navn">Stævnets Navn</lable>
  <input type="text" id="staevne_navn" name="staevne_navn" placeholder="stævnetsNavn-årstal">
  <lable for="staevne_resultat">Pladsering</lable>
  <input type="text" id="staevne_resultat" name="staevne_resultat" placeholder="No.">

  <button type="submit" id="btn-submit-result-time">opret</button>
  </form>
  `;

  document
    .querySelector("#traener-side")
    .insertAdjacentHTML("beforeend", dialogHTML);
}

const numericals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//------------ Validering af forms--------------
function validateFormsDate(year, month, day) {
  const resultDate = new Date(`${year}-${month}-${validateDay(day)}`);
  const dateInSeconds = resultDate.valueOf();
  console.log(dateInSeconds);
  return dateInSeconds;
}

//valider lige om det er den - 30, 31, 28 (ligemeget med skud år???)
function validateDay(day) {
  if (day.length() < 3) {
  }
}

//Når submit-trykkes
function submitNewPreformance(event) {
  event.preventDefault();

  const form = event.target;
  const dateYear = form.resultat_aar.value;
  const dateMonth = form.resultat_maaned.value;
  const dateDay = form.resultat_dag.value;

  const resultData = {
    deciplin: form.svomme_decilpin.value,
    svømmerID: form.svomme_id.value,
    tid: form.svomme_resultat.value,
    dato: validateFormsDate(dateYear, dateMonth, dateDay),
    stævne: form.staevne_navn.value,
    pladsering: form.staevne_resultat.value,
  };

  postNewResult(resultData);
}

async function postNewResult(data) {
  console.log(data);
  const url = `${endpoint}/tider.json`;
  const resultJson = await JSON.stringify(data);
  const resultPost = await fetch(url, { method: "POST", body: resultJson });
}

export { showPreformanceForm };
