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
  document
    .querySelector("#filter-deciplin")
    .addEventListener("change", runFilterResultDeciplines);

  //Radio Buttons - filter by team
  document
    .querySelector("#junior-hold-radio")
    .addEventListener("change", runFilterResultTeamJunior);

  document
    .querySelector("#senior-hold-radio")
    .addEventListener("change", runFilterResultTeamSenior);
}

function runSortResultTable(event) {
  performanceList = sortResultTable(event.target.value);
  createMemberPerfromanceTable(performanceList);
}
async function runFilterResultDeciplines(event) {
  await showMemberPerformances();
  performanceList = filterResultDeciplines(event.target.value);
  createMemberPerfromanceTable(performanceList);
}

function runFilterResultTeamJunior() {
  performanceList = filterResultTeamJunior();
  createMemberPerfromanceTable(performanceList);
  console.log("sort junior");
}

function runFilterResultTeamSenior() {
  performanceList = filterResultTeamSenior();
  createMemberPerfromanceTable(performanceList);
  console.log("sort senior");
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
