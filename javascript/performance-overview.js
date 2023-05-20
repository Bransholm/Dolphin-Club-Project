import { getMemberPerformances } from "./getPerformances.js";

async function showMemberPerformances() {
  const performanceList = await getMemberPerformances();
  console.log(performanceList);
  createMemberPrefromanceTable(performanceList);
}

let membersList

//bedre navne ASAP!
async function runUpdate() {
  membersList = await updateMemberGrid();
}



function createMemberPrefromanceTable(performanceList) {
  for (const performance of performanceList) {
    const individualPerformanceHTML =
      /*html*/
      `<tr>
    <td>${performance.tid}</td>
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
