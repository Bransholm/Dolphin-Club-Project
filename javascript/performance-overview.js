import { getMemberPerformances } from "./getPerformances.js";

async function showMemberPerformances() {
  const performanceList = await getMemberPerformances();
  console.log(performanceList);
}

export { showMemberPerformances };
