import { updateMemberGrid } from "./getMembers.js";
import { calculateAgeDate } from "./helperFunctions.js";

let medlemmer;

let passivJuniorSeniorPaid;
let passivJuniorSeniorUnpaid;
let passivPensionistPaid;
let passivPensionistUnpaid;
let aktivJuniorPaid;
let aktivJuniorUnpaid;
let aktivSeniorPaid;
let aktivSeniorUnpaid;
let aktivPensionistPaid;
let aktivPensionistUnpaid;

async function kasserFinance() {
  medlemmer = await updateMemberGrid();
    passivJuniorSeniorPaid = 0;
    passivJuniorSeniorUnpaid = 0;
    passivPensionistPaid = 0;
    passivPensionistUnpaid = 0;
    aktivJuniorPaid = 0;
    aktivJuniorUnpaid = 0;
    aktivSeniorPaid = 0;
    aktivSeniorUnpaid = 0;
    aktivPensionistPaid = 0;
    aktivPensionistUnpaid = 0;

  kasserMemberStatus();
}

function kasserMemberStatus() {
    for (let medlem of medlemmer) {
  
        const age = calculateAgeDate(medlem);
  
        if (medlem.aktiv === false && age < 61 && medlem.betalt === true) { passivJuniorSeniorPaid++; }
        if (medlem.aktiv === false && age < 61 && medlem.betalt === false) { passivJuniorSeniorUnpaid++; }
        
        else if (medlem.aktiv === false && age > 60 && medlem.betalt === true) { passivPensionistPaid++; }
        else if (medlem.aktiv === false && age > 60 && medlem.betalt === false) { passivPensionistUnpaid++; }
        
        else if (medlem.aktiv === true && age > 60 && medlem.betalt === true) { aktivPensionistPaid++; }
        else if (medlem.aktiv === true && age > 60 && medlem.betalt === false) { aktivPensionistUnpaid++; }
        
        else if (medlem.aktiv === true && age < 18 && medlem.betalt === true) { aktivJuniorPaid++; }
        else if (medlem.aktiv === true && age < 18 && medlem.betalt === false) { aktivJuniorUnpaid++; }
        
        else if (medlem.aktiv === true && age >= 18 && age <= 60 && medlem.betalt === true) { aktivSeniorPaid++; }
        else if (medlem.aktiv === true && age >= 18 && age <= 60 && medlem.betalt === false) { aktivSeniorUnpaid++; }
    }

    financeCalculation();


    console.log(`passivJuniorSeniorPaid`);
    console.log(`passivJuniorSeniorUnpaid`);
    console.log(`passivPensionistPaid`);
    console.log(`passivPensionistUnpaid`);
    console.log(`aktivJuniorPaid`);
    console.log(`aktivJuniorUnpaid`);
    console.log(`aktivSeniorPaid`);
    console.log(`aktivSeniorUnpaid`);
    console.log(`aktivPensionistPaid`);
    console.log(`aktivPensionistUnpaid`);
}

function financeCalculation() {
    let indtaegtsPotentialle = aktivPensionist * 5;
    console.log(`Indtægtspoetentialle: ${indtaegtsPotentialle}`);
}


export { kasserFinance };

// Passiv
// - &0 eller yngre
// - Over 60

// Aktiv
// - Under 18
// - Over 18
// - Over 60

// Indtjeningspotentiale
// Imdbetalt
// Udestående

// Alder
// Counte brugertyper
