import { updateMemberGrid } from "./getMembers.js";
import {
  createMemberClicked,
  closeMemberSuccessWindow,
  resetForm,
  createMember,
} from "./createMember.js";
import {
  updateMemberClicked,
  closeUpdateSuccessWindow,
} from "./updateMember.js";
import {
  deleteMemberClicked,
  closeDeleteSuccessWindow,
} from "./deleteMember.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

let medlemmer;

//window.addEventListener("load", start);

async function startIndmelding() {
  runUpdate();
  // const memberlist = updateMemberGrid();
  // console.log(memberlist);
  // showMembers(memberlist);

  //document
  //  .querySelector("#btn-create-member")
  //  .addEventListener("click", showNewMember);

  document
    .querySelector("#form-create-member")
    .addEventListener("submit", createMemberClicked);

  document.getElementById("resetButton").addEventListener("click", resetForm);

  document
    .querySelector("#form-delete-member")
    .addEventListener("submit", deleteMemberClicked);

  document
    .querySelector("#form-update-member")
    .addEventListener("submit", updateMemberClicked);

  document
    .querySelector("#sort-memberData")
    .addEventListener("change", sortMember);

  document
    .querySelector("#filterMemberGender")
    .addEventListener("change", filterMemberGender);

  document
    .querySelector("#filter-memberAktiv")
    .addEventListener("change", filterMemberAktive);

  //luk bekræftelses vinduer
  document
    .querySelector("#btn-closeMemberDialog")
    .addEventListener("click", closeMemberSuccessWindow);

  document
    .querySelector("#btn-closeUpdateDialog")
    .addEventListener("click", closeUpdateSuccessWindow);

  document
    .querySelector("#btn-closeDeleteDialog")
    .addEventListener("click", closeDeleteSuccessWindow);

  document.querySelector("#btn-closeErrorDialog", closeErrorWindow);
}

//===========REST============//

//bedre navne ASAP!
async function runUpdate() {
  medlemmer = await updateMemberGrid();
  showMembers(medlemmer);
}
function showMembers(list) {
  document.querySelector("#medlemmer").innerHTML = "";
  //document.querySelector("#forms-div").innerHTML = "";
  for (const medlem of list) {
    displayMember(medlem);
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
                <li>Email: ${memberObject.email}</li>
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
            <button class="btn-delete other-btn">Slet</button>
            <button class="btn-update other-btn">Rediger</button>
        </div>

        </article>
    </section>
    `;

  document.querySelector("#medlemmer").insertAdjacentHTML("beforeend", html);

  document
    .querySelector("#medlemmer section:last-child .btn-delete")
    .addEventListener("click", deleteButtonClicked);

  document
    .querySelector("#medlemmer section:last-child .btn-update")
    .addEventListener("click", updateButtonClicked);

  // Nested funktion fordi det er det som jeg er vandt til, hvordan seperer jeg dem?

  function deleteButtonClicked() {
    console.log("Et medlem er igang med at blive slettet");

    document.querySelector("#member-id").textContent = memberObject.id;

    document.querySelector("#member-name").textContent = memberObject.navn;

    document.querySelector("#member-lastname").textContent =
      memberObject.efternavn;

    document.querySelector("#member-kategori").textContent =
      memberObject.kategori;

    document.querySelector("#member-køn").textContent = memberObject.køn;

    document.querySelector("#member-age").textContent = memberObject.age;

    document
      .querySelector("#form-delete-member")
      .setAttribute("data-id", memberObject.id);

    document.querySelector("#dialog-delete-member").showModal();

    document
      .querySelector("#btn-cancel")
      .addEventListener("click", closeDialog);
  }
  function updateButtonClicked() {
    console.log("Rediger medlem er blevet trykket på");
    const updateForm = document.querySelector("#form-update-member");

    updateForm.navn.value = memberObject.navn;
    updateForm.efternavn.value = memberObject.efternavn;
    updateForm.email.value = memberObject.email;
    updateForm.adresse.value = memberObject.adresse;
    updateForm.postnummer.value = memberObject.postnummer;
    updateForm.fødselsdato.value = memberObject.fødselsdato;
    updateForm.tlf.value = memberObject.tlf;
    updateForm.køn.value = memberObject.køn;
    updateForm.aktiv.checked = memberObject.aktiv;
    updateForm.kategori.value = memberObject.kategori;
    updateForm.betalt.checked = memberObject.betalt;
    //updateForm.age.value = memberObject.age;
    updateForm.crawl.checked = memberObject.crawl;
    updateForm.rygcrawl.checked = memberObject.rygcrawl;
    updateForm.bryst.checked = memberObject.bryst;
    updateForm.butterfly.checked = memberObject.butterfly;
    updateForm.setAttribute("data-id", memberObject.id);

    document.querySelector("#dialog-update-member").showModal();

    document
      .querySelector("#form-update-member")
      .addEventListener("submit", updateMemberClicked);

    document
      .querySelector("#btn-cancel-update")
      .addEventListener("click", closeUpdateDialog);
  }
}

function closeDialog() {
  document.querySelector("#dialog-delete-member").close();
}

function closeUpdateDialog() {
  document.querySelector("#dialog-update-member").close();
  console.log("Opdatering annulleret");
}

function closeErrorWindow() {
  document.querySelector("#response-error").close();
}

function sortMember(event) {
  const sortCriteria = event.target.value;
  console.log(sortCriteria);
  if (sortCriteria === "memberDOB") {
    medlemmer.sort(sortByDateOfBirth);
  } else if (sortCriteria === "memberNavnA") {
    medlemmer.sort(sortByName);
  } else if (sortCriteria === "memberAlder") {
    medlemmer.sort(sortByAge);
  } else if (sortCriteria === "memberNavnÅ") {
    medlemmer.sort(sortByName2);
  }
  showMembers(medlemmer);
}

function sortByName(a, b) {
  console.log("Sorter efter navn A-Å");
  return a.navn.toLowerCase().localeCompare(b.navn.toLowerCase());
}

function sortByName2(a, b) {
  console.log("Sorter efter navn Å-A");
  return b.navn.toLowerCase().localeCompare(a.navn.toLowerCase());
}

function sortByAge(a, b) {
  console.log("Sorter efter alder");
  return a.age - b.age;
}

function sortByDateOfBirth(a, b) {
  //https://stackoverflow.com/questions/41673669/how-to-sort-object-array-by-time-in-javascript
  const timeA = a.fødselsdato + " " + a.fødselsdatoSekunder;
  const timeB = b.fødselsdato + " " + b.fødselsdatoSekunder;
  return timeA.localeCompare(timeB);
}

function filterMemberGender(event) {
  const selected = event.target.value;
  let gender;
  if (selected === "kvinde") {
    gender = medlemmer.filter(checkGenderWoman);
  } else if (selected === "mand") {
    gender = medlemmer.filter(checkGenderMan);
  } else if (selected === "begge") {
    gender = medlemmer;
  }

  function checkGenderWoman(selectedMember) {
    const woman = selectedMember.køn;
    return woman === "kvinde";
  }
  function checkGenderMan(selectedMember) {
    return selectedMember.køn === "mand";
  }

  showMembers(gender);
  console.log(gender);
}

function filterMemberAktive(event) {
  const selected = event.target.value;
  let aktiveOrPassive;
  if (selected === "aktive") {
    aktiveOrPassive = medlemmer.filter(checkAktiveTrue);
  } else if (selected === "passiv") {
    aktiveOrPassive = medlemmer.filter(checkAktiveFalse);
  } else if (selected === "begge") {
    aktiveOrPassive = medlemmer;
  }

  function checkAktiveTrue(selectedMember) {
    const aktiv = selectedMember.aktiv;
    return aktiv === true;
  }

  function checkAktiveFalse(selectedMember) {
    const passiv = selectedMember.aktiv;
    return passiv === false;
  }
  showMembers(aktiveOrPassive);
  console.log(aktiveOrPassive);
}

export { startIndmelding, runUpdate };
