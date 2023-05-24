import { getMemberPerformances } from "./getPerformances.js";
import { updateMemberGrid } from "./getMembers.js";
import { sortResultTable, combinedResultsFilter } from "./helperFunctions.js";

let membersList;
let performanceList;
let performanceCounter;

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

  document
    .querySelector("#filter-deciplin")
    .addEventListener("change", runCombinedResultsFilter);

  document
    .querySelector("#junior-hold-radio")
    .addEventListener("change", runCombinedResultsFilter);

  document
    .querySelector("#senior-hold-radio")
    .addEventListener("change", runCombinedResultsFilter);

  document
    .querySelector("#begge-hold-radio")
    .addEventListener("change", runCombinedResultsFilter);
}

async function runCombinedResultsFilter(event) {
  await showMemberPerformances();
  performanceList = combinedResultsFilter();
  console.log(performanceList);
  createMemberPerfromanceTable(performanceList);
}

function runSortResultTable(event) {
  performanceList = sortResultTable(event.target.value);
  createMemberPerfromanceTable(performanceList);
}

function createMemberPerfromanceTable(performanceList) {
  document.querySelector("#resultater").textContent = "";
  performanceCounter = 0;

  let keyMember;
  for (const performance of performanceList) {
    for (const member of membersList) {
      if (member.kategori === "elite") {
        if (performance.svømmerID == member.id) {
          keyMember = member;
        } else {
          continue;
        }

        performanceCounter++;
        const individualPerformanceHTML =
          /*html*/
          `<tr>
    <td>${performanceCounter}</td>
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
      } else {
        continue;
      }
    }
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
