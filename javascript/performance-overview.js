import { getMemberPerformances } from "./getPerformances.js";
import { updateMemberGrid } from "./getMembers.js";
import { sortResultTable, filterResultDeciplines } from "./helperFunctions.js";

let membersList;
let performanceList;

function bridgePerformanceList() {
  return performanceList;
}

//hvordan pokke får jeg ID?
async function showMemberPerformances() {
  performanceList = await getMemberPerformances();
  membersList = await updateMemberGrid();
  createMemberPerfromanceTable(performanceList);
  addSortRelatedEvents();
}

function addSortRelatedEvents() {
  document
    .querySelector("#resultat-sortering")
    .addEventListener("change", runSortResultTable);

  document
    .querySelector("#filter-deciplin")
    .addEventListener("change", filterResultDeciplines);
}

function runSortResultTable(event) {
  sortResultTable(event.target.value);
  // createMemberPerfromanceTable(performanceList);
}

function createMemberPerfromanceTable(performanceList) {
  document.querySelector("#resultater").textContent = "";

  let keyMember;
  for (const performance of performanceList) {
    keyMember = "Unkown";
    console.log(performance);
    for (const member of membersList) {
      console.log(member);
      if (performance.svømmerID == member.id) {
        keyMember = member;
        console.log("match!");
      } else {
        console.log(`idm ${performance.svømmerID} has no match`);
      }
    }
    const individualPerformanceHTML =
      /*html*/
      `<tr>
    <td>${performance.tid}</td>
    <td>${keyMember.efternavn}, ${keyMember.navn}</td>
    <td>${performance.svømmerID}</td>
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
  showMemberPerformances,
  createMemberPerfromanceTable,
};
