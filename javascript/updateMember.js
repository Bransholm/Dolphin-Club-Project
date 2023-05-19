import { runUpdate } from "./formand.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

async function updateOrder(
  id,
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
) {
  console.log("yippie alt det der....");

  const memberUpdate = {
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
    age,
  };

  console.log("Member update object");
  console.log(memberUpdate);

  const json = JSON.stringify(memberUpdate);
  const response = await fetch(`${endpoint}/orders/${id}.json`, {
    method: "PUT",
    body: json,
  });
  console.log(response.id);
  if (response.ok) {
    console.log("En ordre er blevet opdateret");
    document.querySelector("#successfull-booking-dialog-update").showModal();

    runUpdate();
  }
}
