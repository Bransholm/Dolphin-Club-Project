import { updateMemberGrid } from "./getMembers.js";
import { calculateAgeDate } from "./helperFunctions.js";

let medlemmer;
let passivJuniorSenior;
let passivPensionist;
let aktivJunior;
let aktivSenior;
let aktivPensionist;

async function kasserFinance() {
  medlemmer = await updateMemberGrid();
  passivJuniorSenior = 0;
  passivPensionist = 0;
  aktivJunior = 0;
  aktivSenior = 0;
  aktivPensionist = 0;
  kasserMemberStatus();
}

function kasserMemberStatus() {
    for (let medlem of medlemmer) {
  
        const age = calculateAgeDate(medlem);
        console.log(age);
  
        if (medlem.aktiv === false && age >= 60) {
            passivJuniorSenior++;
        } else if (medlem.aktiv === false && age < 60) {
            passivPensionist++;
        } else if (medlem.aktiv === true && age < 60) {
            aktivPensionist++;
        } else if (medlem.aktiv === true && age > 18) {
            aktivJunior++;
        } else {
            aktivSenior++;
        }
    }

    console.log(`passivJuniorSenior ${passivJuniorSenior}`);
    console.log(`passivPensionist ${passivPensionist}`);
    console.log(`aktivJunior ${aktivJunior}`);
    console.log(`aktivSenior ${aktivSenior}`);
    console.log(`aktivPensionist ${aktivPensionist}`);
    
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
