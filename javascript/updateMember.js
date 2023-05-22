import { runUpdate } from "./formand.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

async function updateMember(
  id,
  adresse,
  aktiv,
  betalt,
  bryst,
  butterfly,
  crawl,
  email,
  efternavn,
  fødselsdato,
  kategori,
  køn,
  navn,
  postnummer,
  rygcrawl,
  tlf,
  age
) {
  console.log("Update test log");

  const memberUpdate = {
    adresse,
    aktiv,
    betalt,
    bryst,
    butterfly,
    crawl,
    email,
    efternavn,
    fødselsdato,
    kategori,
    køn,
    navn,
    postnummer,
    rygcrawl,
    tlf,
    age,
  };

  console.log("Member update object");
  console.log(memberUpdate);

  const json = JSON.stringify(memberUpdate);
  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
    method: "PUT",
    body: json,
  });
  if (response.ok) {
    console.log("Et medlem er blevet opdateret");
    document.querySelector("#successfull-updateMember").showModal();
    runUpdate();
  } else {
    console.error("Failed to update member:", response.status);
  }
}
function updateMemberClicked(event) {
  event.preventDefault();
  console.log("Updatering af medlem igang!");

  const form = document.getElementById("form-update-member"); // Get the form element by ID

  const adresse = form.elements.adresse.value;
  const aktiv = form.elements.aktiv.checked;
  const betalt = form.elements.betalt.checked;
  const bryst = form.elements.bryst.checked;
  const butterfly = form.elements.butterfly.checked;
  const crawl = form.elements.crawl.checked;
  const email = form.elements.email.value;
  const efternavn = form.elements.efternavn.value;
  const fødselsdato = form.elements.fødselsdato.value;
  const kategori = form.elements.kategori.value;
  const køn = form.elements.køn.value;
  const navn = form.elements.navn.value;
  const postnummer = form.elements.postnummer.value;
  const rygcrawl = form.elements.rygcrawl.checked;
  const tlf = form.elements.tlf.value;

  const dob = new Date(fødselsdato);
  const today = new Date();

  const id = form.getAttribute("data-id");

  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  updateMember(
    id,
    adresse,
    aktiv,
    betalt,
    bryst,
    butterfly,
    crawl,
    email,
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
  document.querySelector("#dialog-update-member").close();
}

function closeUpdateSuccessWindow() {
  document.querySelector("#successfull-updateMember").close();
}

export { updateMemberClicked, closeUpdateSuccessWindow };
