import {
  bridgePerformanceList,
  bridgeMembersList,
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



// // https: stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
function combinedResultsFilter() {
  const selectedTeam = document.querySelector(
    `input[name="filter-hold"]:checked`
  ).value;
  const selectedDecipline = document.querySelector("#filter-deciplin").value;

  const performances = bridgePerformanceList();
  const members = bridgeMembersList();

  const resultList = performances.filter(filterResults);

  function filterResults(performance) {
    for (let member of members) {
      const memberAge = calculateAgeTimestamp(member);
      if (performance.svømmerID === member.id) {
        if (selectedDecipline === "alle") {
          if (selectedTeam === "junior") {
            return memberAge < 18;
          } else if (selectedTeam === "senior") {
            return memberAge >= 18;
          } else if (selectedTeam === "begge") {
            return performances;
          }
        } else {
          if (selectedTeam === "junior") {
            return performance.deciplin === selectedDecipline && memberAge < 18;
          } else if (selectedTeam === "senior") {
            return (
              performance.deciplin === selectedDecipline && memberAge >= 18
            );
          } else if (selectedTeam === "begge") {
            return performance.deciplin === selectedDecipline;
          }
        }
      }
    }
  }
  // console.log(resultList);
  return resultList;
}

function calculateAgeDate(member) {
  const dob = new Date(member.fødselsdato);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

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
  combinedResultsFilter,
  calculateAgeDate,
};
