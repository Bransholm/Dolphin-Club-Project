const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

let prestationer;

async function getMemberPerformances() {
  prestationer = fetchMemberPerformanceObject();
  return prestationer;
}

async function fetchMemberPerformanceObject() {
  const preformancePromise = await fetch(`${endpoint}/tider.json`);
  const performanceData = await preformancePromise.json();
  const performanceList = createPerformanceArray(performanceData);
  return performanceList;
}

function createPerformanceArray(performances) {
  const array = [];
  for (const performanceKey in performances) {
    const performancesObject = performances[performanceKey];
    performancesObject.id = performanceKey;
    array.push(performancesObject);
  }
  return array;
}

export { getMemberPerformances };
