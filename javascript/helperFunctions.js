import {
  bridgePerformanceList,
  bridgeMembersList,
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
  return b.datoSekunder - a.datoSekunder;
}

// //https: stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
// function combinedFilterFunction() {
//   const slectedTeam = document.querySelector(
//     `input[name="filter-hold"]:checked`
//   ).value;
//   const selectedDecipline = document.querySelector("#filter-deciplin").value;



  
// }

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

function filterResultTeamSenior() {
  const members = bridgeMembersList();
  const performances = bridgePerformanceList();
  const seniorPerformances = performances.filter(filtering02);

  function filtering02(performance) {
    for (let member of members) {
      if (performance.svømmerID === member.id) {
        const age = calculateAgeTimestamp(member);
        return age >= 18;
      }
    }
  }

  console.log(seniorPerformances);
  return seniorPerformances;
}

function filterResultTeamJunior() {
  const members = bridgeMembersList();
  const performances = bridgePerformanceList();
  const juniorPerformances = performances.filter(filtering);
  function filtering(performance) {
    for (let member of members) {
      if (performance.svømmerID === member.id) {
        const age = calculateAgeDate(member);
        return age < 18;
      }
    }
  }
  console.log(juniorPerformances);
  return juniorPerformances;
}

function calculateAgeDate(member) {
  const dob = new Date(member.fødselsdato);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  console.log(age);

  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function calculateAgeTimestamp(member) {
  const currentDate = new Date();
  const currentDateSeconds = currentDate.valueOf();
  const timeSinceBirth = currentDateSeconds - member.fødselsdatoSekunder;
  const millieSecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const age = timeSinceBirth / millieSecondsPerYear;
  return age;
}

function changeFormat(member) {
  const x = member.fødselsdatoSekunder;
  const birthdate = new Date(x);
  const year = birthdate.getFullYear();
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();
  const hours = birthdate.getHours();
  const minuttes = birthdate.getMinutes();
  const seconds = birthdate.getSeconds();

  const result = `${year}-${month}-${day}-${hours}-${minuttes}-${seconds}`;
  console.log(result);
}

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

export {
  sortResultTable,
  filterResultDeciplines,
  filterResultTeamSenior,
  filterResultTeamJunior,
};
