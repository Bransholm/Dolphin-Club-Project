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
  try {
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
  } catch (error) {
    console.error("An error occurred during the update:", error);
  }
}
function updateMemberClicked(event) {
  event.preventDefault();
  console.log("Updatering af medlem igang!");

  const form = event.target;

  const adresse = form.adresse.value;
  const aktiv = form.aktiv.checked;
  const betalt = form.betalt.checked;
  const bryst = form.bryst.checked;
  const butterfly = form.butterfly.checked;
  const crawl = form.crawl.checked;
  const email = form.email.value;
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

  document.querySelector("#dialog-update-member").close();
}

function closeUpdateSuccessWindow() {
  document.querySelector("#successfull-updateMember").close();
}

export { updateMemberClicked, closeUpdateSuccessWindow };
