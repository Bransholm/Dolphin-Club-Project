import { runUpdate } from "./formand.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

async function createMember(
  adresse,
  aktiv,
  betalt,
  bryst,
  butterfly,
  crawl,
  efternavn,
  email,
  fødselsdatoSekunder,
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
    adresse: adresse,
    aktiv: aktiv,
    betalt: betalt,
    bryst: bryst,
    butterfly: butterfly,
    crawl: crawl,
    email: email,
    efternavn: efternavn,
    fødselsdatoSekunder: fødselsdatoSekunder,
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
  try {
    const response = await fetch(`${endpoint}/medlemmer.json`, {
      method: "POST",
      body: json,
    });

    if (response.ok) {
      console.log("Nyt medlem er blevet oprettet i Firebase");
      document.querySelector("#successfull-createMember").showModal();
      runUpdate();
    } else {
      console.error("Failed to create member:", response.status);
    }
  } catch (error) {
    console.error("An error occurred during create:", error);
  }
}

//https:
//stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd?fbclid=IwAR3SjJ2ozyxXnc_JnssjQeVzKMB_7j99TEz65Fno1cUo5GazZ0GBExjJlpk
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  const newFormate = [year, month, day].join("-");
  const newBirthday = new Date(`${newFormate}`);
  console.log(newFormate);
  const birthdayInSeconds = newBirthday.valueOf();
  return birthdayInSeconds;
}

function createMemberClicked(event) {
  console.log(event);
  event.preventDefault();
  //const reset = document.getElementById("dialogMemberCreate");

  const form = event.target;

  const adresse = form.adresse.value;
  const aktiv = form.aktiv.checked;
  const betalt = form.betalt.checked;
  const bryst = form.bryst.checked;
  const butterfly = form.butterfly.checked;
  const crawl = form.crawl.checked;
  const efternavn = form.efternavn.value;
  const email = form.email.value;
  const fødselsdato = form.fødselsdato.value;
  const fødselsdatoSekunder = formatDate(form.fødselsdato.value);
  const kategori = form.kategori.value;
  const køn = form.køn.value;
  const navn = form.navn.value;
  const postnummer = form.postnummer.value;
  const rygcrawl = form.rygcrawl.checked;
  const tlf = form.tlf.value;
  // funktionen...
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
  console.log(email);
  console.log(fødselsdato);
  console.log(kategori);
  console.log(køn);
  console.log(navn);
  console.log(postnummer);
  console.log(rygcrawl);
  console.log(tlf);
  console.log(age);
  console.log(fødselsdatoSekunder);

  createMember(
    adresse,
    aktiv,
    betalt,
    bryst,
    butterfly,
    crawl,
    efternavn,
    email,
    fødselsdatoSekunder,
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
  document
    .getElementById("createButton")
    .addEventListener("click", createMemberClicked);

  document.getElementById("resetButton").addEventListener("click", resetForm);
}

function resetForm() {
  document.getElementById("form-create-member").reset();
}

function showNewMember() {
  console.log("En user har clicket på indmeld!");
  document.querySelector("#dialogMemberCreate").showModal();
}

function closeMemberSuccessWindow() {
  document.querySelector("#successfull-createMember").close();
  document.querySelector("#indmeling-side").classList.remove("active");
  document.querySelector("#velkommen-side").classList.add("active");
}

export {
  showNewMember,
  createMemberClicked,
  resetForm,
  closeMemberSuccessWindow,
  formatDate,
  createMember,
};
