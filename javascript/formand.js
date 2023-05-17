import { updateMemberGrid } from "./getMembers.js";
import { showNewMember, createMemberClicked } from "./createMember.js";

// const endpoint =
//   "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

let medlemmer;

//window.addEventListener("load", start);

async function startIndmelding() {
  runUpdate();
  // const memberlist = updateMemberGrid();
  // console.log(memberlist);
  // showMembers(memberlist);

  document
    .querySelector("#btn-create-member")
    .addEventListener("click", showNewMember);

  document
    .querySelector("#form-create-member")
    .addEventListener("submit", createMemberClicked);
}

//===========REST============//

//bedre navne ASAP!
async function runUpdate() {
  medlemmer = await updateMemberGrid();
  showMembers(medlemmer);
}

function showMembers(listOfMembers) {
  console.log(listOfMembers);
  document.querySelector("#medlemmer").innerHTML = "";

  for (const member of listOfMembers) {
    displayMember(member);
  }
}

//
function displayMember(memberObject) {
  const html =
    /*html*/
    `
    <section class="grid-item">
        <h2>Stamdata</h2>
        <h3>${memberObject.navn} ${memberObject.efternavn}</h3>
        <p>${memberObject.id}</p>
        <article class = "list-item">
            <ul>
                <li>Adresse: ${memberObject.adresse} ${memberObject.postnummer}</li>
                <li>Fødselsdato: ${memberObject.fødselsdato}</li>
                <li>Tlf-Nr: ${memberObject.tlf}</li>
                <li>Køn: ${memberObject.køn}</li>
                <li>Aktiv medlem: ${memberObject.aktiv}</li>
                <li>Kategori: ${memberObject.kategori}</li>
                <li>Betalt: ${memberObject.betalt}</li>
            </ul>
            <p>Din alder:</p>
            <p>${memberObject.age}</p>
            <h3>Svømmerens discipliner:</h3>
             <ul>
                <li>Crawl: ${memberObject.crawl}</li>
                <li>Rygcrawl: ${memberObject.rygcrawl}</li>
                <li>Bryst: ${memberObject.bryst}</li>
                <li>Butterfly: ${memberObject.butterfly}</li>
            </ul>
        <div class="btns">
            <button class="btn-delete">Slet</button>
            <button class="btn-update">Edit</button>
        </div>

        </article>
    </section>
    `;

  document.querySelector("#medlemmer").insertAdjacentHTML("beforeend", html);
}

export { startIndmelding, runUpdate };
