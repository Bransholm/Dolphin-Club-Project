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

let medlemmer = [];

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
  // document
  //   .querySelector("#sort-memberData")
  //   .addEventListener("change", sortMember);

  //   document
  //     .querySelector("#filterMemberGender")
  //     .addEventListener("change", filterMemberGender);

  //   document
  //     .querySelector("#filter-memberAktiv")
  //     .addEventListener("change", filterMemberAktive);
}

//HEJ KENNETH
function displayMember(memberObject) {
  const html =
    /*html*/
    `
      <section class = "formand-grid-user">
        <h4>${memberObject.navn} ${memberObject.efternavn}</h4>
          Adresse: ${memberObject.adresse}<br />
          Postnummer${memberObject.postnummer}<br />
          Fødselsdato: ${memberObject.fødselsdato}<br />
          Tlf-Nr: ${memberObject.tlf}<br />
          Email: ${memberObject.email}<br />
          Køn: ${memberObject.køn}<br />
          Aktiv medlem: ${memberObject.aktiv}<br />
          Kategori: ${memberObject.kategori}<br />
          Betalt: ${memberObject.betalt}<br />
          Alder: ${memberObject.age}<br />
          Svømmerens discipliner<br />
          Crawl: ${memberObject.crawl}<br />
          Rygcrawl: ${memberObject.rygcrawl}<br />
          Bryst: ${memberObject.bryst}<br />
          Butterfly: ${memberObject.butterfly}<br />
          <div class="btns">
            <button class="btn-delete other-btn">Slet</button>
            <button class="btn-update other-btn">Rediger</button>
        </div>
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

function sortMember() {
  const sortCriteria = document.querySelector("#sortMemberData").value;
  let sortedMembers = medlemmer;
  if (sortCriteria === "memberDOB") {
    sortedMembers = sortedMembers.sort(sortByDateOfBirth);
  } else if (sortCriteria === "memberNavnA") {
    sortedMembers = sortedMembers.sort(sortByName);
  } else if (sortCriteria === "memberAlder") {
    sortedMembers = sortedMembers.sort(sortByAge);
  } else if (sortCriteria === "memberNavnÅ") {
    sortedMembers = sortedMembers.sort(sortByName2);
  }
  showMembers(sortedMembers);
}

function sortByName(a, b) {
  //console.log(sortByName);
  return a.navn.toLowerCase().localeCompare(b.navn.toLowerCase());
}

function sortByName2(a, b) {
  //console.log("Sorter efter navn Å-A");
  return b.navn.toLowerCase().localeCompare(a.navn.toLowerCase());
}

function sortByAge(a, b) {
  //console.log("Sorter efter alder");
  return a.age - b.age;
}

function sortByDateOfBirth(a, b) {
  //https://stackoverflow.com/questions/41673669/how-to-sort-object-array-by-time-in-javascript
  const timeA = a.fødselsdato + " " + a.fødselsdatoSekunder;
  const timeB = b.fødselsdato + " " + b.fødselsdatoSekunder;
  return timeA.localeCompare(timeB);
}

// function filterMemberGender(event) {
//   const selected = event.target.value;
//   let gender;
//   if (selected === "kvinde") {
//     gender = medlemmer.filter(checkGenderWoman);
//   } else if (selected === "mand") {
//     gender = medlemmer.filter(checkGenderMan);
//   } else if (selected === "begge") {
//     gender = medlemmer;
//   }

//   function checkGenderWoman(selectedMember) {
//     const woman = selectedMember.køn;
//     return woman === "kvinde";
//   }
//   function checkGenderMan(selectedMember) {
//     return selectedMember.køn === "mand";
//   }

//   showMembers(gender);
//   console.log(gender);
// }

// function filterMemberAktive(event) {
//   const selected = event.target.value;
//   let aktiveOrPassive;
//   if (selected === "aktiv") {
//     aktiveOrPassive = medlemmer.filter(checkAktiveTrue);
//   } else if (selected === "passiv") {
//     aktiveOrPassive = medlemmer.filter(checkAktiveFalse);
//   } else if (selected === "begge") {
//     aktiveOrPassive = medlemmer;
//   }

//   function checkAktiveTrue(selectedMember) {
//     const aktiv = selectedMember.aktiv;
//     return aktiv === true;
//   }

//   function checkAktiveFalse(selectedMember) {
//     const passiv = selectedMember.aktiv;
//     return passiv === false;
//   }
//   showMembers(aktiveOrPassive);
//   event.preventDefault();
//   // runUpdate(aktiveOrPassive);

//   console.log(aktiveOrPassive);
// }

function filterMembers() {
  const selectedGender = document.querySelector("#filterMemberGender").value;
  const selectedAktive = document.querySelector("#filterMemberAktiv").value;
  let filteredMembers = medlemmer;

  if (selectedGender === "kvinde") {
    filteredMembers = filteredMembers.filter(
      (member) => member.køn === "kvinde"
    );
  } else if (selectedGender === "mand") {
    filteredMembers = filteredMembers.filter((member) => member.køn === "mand");
  }

  if (selectedAktive === "aktiv") {
    filteredMembers = filteredMembers.filter((member) => member.aktiv);
  } else if (selectedAktive === "passiv") {
    filteredMembers = filteredMembers.filter((member) => !member.aktiv);
  }
  showMembers(filteredMembers);
  console.log(filteredMembers);

  // medlemmer = filterMembers;
  // showMembers(medlemmer);
}

const memberSortElement = document.querySelector("#sortMemberData");
const genderFilterElement = document.querySelector("#filterMemberGender");
const aktiveFilterElement = document.querySelector("#filterMemberAktiv");

memberSortElement.addEventListener("change", sortMember);
genderFilterElement.addEventListener("change", filterMembers);
aktiveFilterElement.addEventListener("change", filterMembers);

export { startIndmelding, runUpdate };
