import { getMemberPerformances } from "./getPerformances.js";
import { updateMemberGrid } from "./getMembers.js";
import {
  sortResultTable,
  filterResultDeciplines,
  filterResultTeamSenior,
  filterResultTeamJunior,
} from "./helperFunctions.js";

let membersList;
let performanceList;

function bridgePerformanceList() {
  return performanceList;
}
function bridgeMembersList() {
  return membersList;
}

//hvordan pokke får jeg ID?
async function showMemberPerformances() {
  performanceList = await getMemberPerformances();
  membersList = await updateMemberGrid();
  createMemberPerfromanceTable(performanceList);
  addSortRelatedEvents();
}

function addSortRelatedEvents() {
  // Sorting Selector
  document
    .querySelector("#resultat-sortering")
    .addEventListener("change", runSortResultTable);

  // Deciplin filter selector
  // document
  //   .querySelector("#filter-deciplin")
  //   .addEventListener("change", runFilterResultDeciplines);

  document
    .querySelector("#filter-deciplin")
    .addEventListener("change", combinedFilterFunction);

  //Radio Buttons - filter by team
  document
    .querySelector("#junior-hold-radio")
    .addEventListener("change", runFilterResultTeamJunior);

  document
    .querySelector("#senior-hold-radio")
    .addEventListener("change", runFilterResultTeamSenior);

  document
    .querySelector("#begge-hold-radio")
    .addEventListener("change", refreshMembersList);
}

function runSortResultTable(event) {
  performanceList = sortResultTable(event.target.value);
  createMemberPerfromanceTable(performanceList);
}
async function runFilterResultDeciplines(event) {
  //Refresh
  await showMemberPerformances();
  performanceList = filterResultDeciplines(event.target.value);
  createMemberPerfromanceTable(performanceList);
}

async function runFilterResultTeamJunior() {
  //Refresh
  await showMemberPerformances();
  performanceList = filterResultTeamJunior();
  createMemberPerfromanceTable(performanceList);
  console.log("sort junior");
}

async function runFilterResultTeamSenior() {
  //Refresh
  await showMemberPerformances();
  performanceList = filterResultTeamSenior();
  createMemberPerfromanceTable(performanceList);
  console.log("sort senior");
}

// // https: stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
async function combinedFilterFunction() {
  await showMemberPerformances();
  const selectedTeam = document.querySelector(
    `input[name="filter-hold"]:checked`
  ).value;
  const selectedDecipline = document.querySelector("#filter-deciplin").value;

  const performances = performanceList;
  const members = membersList;

  const resultList = performances.filter(filterResults);

  function filterResults(performance) {
    for (let member of members) {
      const memberAge = calculateAgeTimestamp(member);
      if (performance.svømmerID === member.id) {
        if (selectedTeam === "junior") {
          return performance.deciplin === selectedDecipline && memberAge > 18;
        } else if (selectedTeam === "senior") {
          return performance.deciplin === selectedDecipline && memberAge <= 18;
        }
      }
    }
  }
  performanceList = resultList;
}

function calculateAgeTimestamp(member) {
  const currentDate = new Date();
  const currentDateSeconds = currentDate.valueOf();
  const timeSinceBirth = currentDateSeconds - member.fødselsdatoSekunder;
  const millieSecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const age = timeSinceBirth / millieSecondsPerYear;
  return age;
}

function refreshMembersList() {
  createMemberPerfromanceTable(performanceList);
}

function createMemberPerfromanceTable(performanceList) {
  document.querySelector("#resultater").textContent = "";

  let keyMember;
  for (const performance of performanceList) {
    keyMember = "Unkown";
    // console.log(performance);
    for (const member of membersList) {
      // console.log(member);
      if (performance.svømmerID == member.id) {
        keyMember = member;
        // console.log("match!");
      } else {
        // console.log(`idm ${performance.svømmerID} has no match`);
      }
    }
    const individualPerformanceHTML =
      /*html*/
      `<tr>
    <td>${performance.tid}</td>
    <td>${keyMember.efternavn}, ${keyMember.navn}</td>
    <td>${keyMember.adresse}</td>
    <td>${performance.deciplin}</td>
    <td>${performance.stævne}</td>
    <td>${performance.dato}</td> 
    </tr>`;

    document
      .querySelector("#resultater")
      .insertAdjacentHTML("beforeend", individualPerformanceHTML);
  }
}

//----------- show times ---------------------------------------
//---- Jeg skal have sort og filter...

//jeg vil have tider OG svømmere, jeg vil filtrere inden.
export {
  bridgePerformanceList,
  bridgeMembersList,
  showMemberPerformances,
  createMemberPerfromanceTable,
};
