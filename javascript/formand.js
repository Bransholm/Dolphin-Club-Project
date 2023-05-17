import { updateMemberGrid } from "./getMembers.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

let medlemmer;

//window.addEventListener("load", start);

function startIndmelding() {
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

function showMembers(listOfMembers) {
  console.log("Show the members");
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

async function createMember(
  adresse,
  aktiv,
  betalt,
  bryst,
  butterfly,
  crawl,
  efternavn,
  fødselsdato,
  kategori,
  køn,
  navn,
  postnummer,
  rygcrawl,
  tlf
) {
  const dob = new Date(fødselsdato);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  const newMember = {
    addresse: adresse,
    aktiv: aktiv,
    betalt: betalt,
    bryst: bryst,
    butterfly: butterfly,
    crawl: crawl,
    efternavn: efternavn,
    fødselsdato: fødselsdato,
    kategori: kategori,
    køn: køn,
    navn: navn,
    postnummer: postnummer,
    rygcrawl: rygcrawl,
    tlf: tlf,
    age: age,
  };
  const json = JSON.stringify(newMember);
  const response = await fetch(`${endpoint}/medlemmer.json`, {
    method: "POST",
    body: json,
  });
  if (response.ok) {
    console.log("Nyt medlem er blevet oprettet i Firebase");
    updateMemberGrid();
  }
}

function createMemberClicked(event) {
  console.log(event);
  event.preventDefault();

  const form = event.target;

  const adresse = form.adresse.value;
  const aktiv = form.aktiv.value;
  const betalt = form.betalt.value;
  const bryst = form.bryst.checked;
  const butterfly = form.butterfly.checked;
  const crawl = form.crawl.checked;
  const efternavn = form.efternavn.value;
  const fødselsdato = form.fødselsdato.value;
  const kategori = form.kategori.value;
  const køn = form.køn.value;
  const navn = form.navn.value;
  const postnummer = form.postnummer.value;
  const rygcrawl = form.rygcrawl.checked;
  const tlf = form.tlf.value;
  const dob = new Date(fødselsdato);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  console.log(adresse);
  console.log(aktiv);
  console.log(betalt);
  console.log(bryst);
  console.log(butterfly);
  console.log(crawl);
  console.log(efternavn);
  console.log(fødselsdato);
  console.log(kategori);
  console.log(køn);
  console.log(navn);
  console.log(postnummer);
  console.log(rygcrawl);
  console.log(tlf);
  console.log(age);

  createMember(
    adresse,
    aktiv,
    betalt,
    bryst,
    butterfly,
    crawl,
    efternavn,
    fødselsdato,
    kategori,
    køn,
    navn,
    postnummer,
    rygcrawl,
    tlf,
    age
  );
  form.reset();
  document.querySelector("#dialogMemberCreate").close();
}

function showNewMember() {
  console.log("En user har clicket på indmeld!");
  document.querySelector("#dialogMemberCreate").showModal();
}

export { startIndmelding, showMembers };
