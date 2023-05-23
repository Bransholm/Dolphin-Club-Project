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
}

function sortByFastest(a, b) {
  return a.tidCentisekunder - b.tidCentisekunder;
}

//Dato måler ældre datoer som lavere tal.
function sortByMostRecent(a, b) {
  return b.dato - a.dato;
}

//Jeg vil filter/loope - hvis decipline.value = true! skal de med.

//jeg BLIVER NØD TIL AT REFRESHE HELE LISTE ON CHANGE!
// ALLE - bliver også nød til at køre for sig selv.
function filterResultDeciplines(decipline) {
  const performances = bridgePerformanceList();

  if (decipline == "alle") {
    return performances;
  } else {
    const result = performances.filter(filterByDecipline);
    return result;
  }

  function filterByDecipline(performance) {
    return performance.deciplin === decipline;
  }
}

// function filterResultTeamJunior(){};


// MINIMUM VIABLE PRODUCT...
//Jeg vil ikke se folk der er motionister - skal jeg slet ikke kunne vælge deres ID-er?
// Hvordan med om DE er aktive i en deciplin eller ej... hot daym.
// Jeg vil have et filter så jeg kan se ditten og datten

// Jeg skal også have styr på deres alder...
// ALDER - loop på tider; Loop på Members og crosscheck ID -> Hvis ID passer få så alderen.
/// Få dags dato og udregn om den pågælende alder er over 18? - filtrer til eller fra --> Hvis ny liste!
//// Kommer refresh af DECIPLIN og ALDER til at støde sammen?
// Lav en counter der viser hvad nummer en fyr er - avoid doubbles?
// Når vi laver et fetch - hav en... 

export { sortResultTable, filterResultDeciplines };
