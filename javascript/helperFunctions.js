import {
  bridgePerformanceList,
  createMemberPerfromanceTable,
} from "./performance-overview.js";

// let performances = bridgePerformanceList();

function sortResultTable(value) {
  console.log("call");
  const performances = bridgePerformanceList();

  //   const value = event.target.value;
  if (value === "hurtigst") {
  return performances.sort(sortByFastest);
  } else if (value === "nyeste") {
  return performances.sort(sortByMostRecent);
  }
//   createMemberPerfromanceTable(performances);
}

function sortByFastest(a, b) {
  return a.tidCentisekunder - b.tidCentisekunder;
}

//Dato måler ældre datoer som lavere tal.
function sortByMostRecent(a, b) {
  return b.dato - a.dato;
}

//Jeg vil filter/loope - hvis decipline.value = true! skal de med.

function filterResultDeciplines(event) {
  const performances = bridgePerformanceList();
  const decipline = event.target.value;
  if (decipline == "alle") {
    createMemberPerfromanceTable(performances);
  } else {
    const filteredList = performances.filter(filterByDecipline);
    createMemberPerfromanceTable(filteredList);
  }

  function filterByDecipline(performance) {
    return performance.deciplin === decipline;
  }
}

// MINIMUM VIABLE PRODUCT...
//Jeg vil ikke se folk der er motionister - skal jeg slet ikke kunne vælge deres ID-er?
// Hvordan med om DE er aktive i en deciplin eller ej... hot daym.
// Jeg vil have et filter så jeg kan se ditten og datten
// jeg ville kunne filtrer så jeg kan se én tid pr. svømmeID og filtrer på deciplin - flere filtre aktive på engang?
// Jeg skal også have styr på deres alder...

export { sortResultTable, filterResultDeciplines };
