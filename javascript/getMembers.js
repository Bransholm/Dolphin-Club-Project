const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

let medlemmer;

async function updateMemberGrid() {
  console.log("update grid");
  medlemmer = await getMembers();
  return medlemmer;
}

async function getMembers() {
  console.log("HentData");
  const response = await fetch(`${endpoint}/medlemmer.json`);
  const data = await response.json();
  const members = prepareData(data);

  return members;
}

function prepareData(dataObject) {
  console.log("lav et array");
  const array = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    array.push(object);
  }
  return array;
}

// function showMembers(medlemmer) {
//   console.log("whatevet");
// }

export { updateMemberGrid };
