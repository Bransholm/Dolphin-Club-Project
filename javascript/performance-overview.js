import { getMemberPerformances } from "./getPerformances.js";
import { updateMemberGrid } from "./getMembers.js";

let membersList;
let performanceList;

//hvordan pokke får jeg ID?
async function showMemberPerformances() {
  performanceList = await getMemberPerformances();
  membersList = await updateMemberGrid();
  createMemberPrefromanceTable();
}

function createMemberPrefromanceTable() {
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

export { showMemberPerformances };
