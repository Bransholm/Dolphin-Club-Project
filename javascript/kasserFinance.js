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
        else if (medlem.aktiv === false && age < 61 && medlem.betalt === false) { passivJuniorSeniorUnpaid++; }
        
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


    console.log(`passivJuniorSeniorPaid: ${passivJuniorSeniorPaid}`);
    console.log(`passivJuniorSeniorUnpaid: ${passivJuniorSeniorUnpaid}`);
    console.log(`passivPensionistPaid: ${passivPensionistPaid}`);
    console.log(`passivPensionistUnpaid: ${passivPensionistUnpaid}`);
    console.log(`aktivJuniorPaid: ${aktivJuniorPaid}`);
    console.log(`aktivJuniorUnpaid: ${aktivJuniorUnpaid}`);
    console.log(`aktivSeniorPaid: ${aktivSeniorPaid}`);
    console.log(`aktivSeniorUnpaid: ${aktivSeniorUnpaid}`);
    console.log(`aktivPensionistPaid: ${aktivPensionistPaid}`);
    console.log(`aktivPensionistUnpaid: ${aktivPensionistUnpaid}`);
}

function financeCalculation() {
    let indtaegtsPotentialle = (passivJuniorSeniorPaid * 500) + (passivJuniorSeniorUnpaid * 500) + (passivPensionistPaid * 375) + (passivPensionistUnpaid * 375) + (aktivJuniorPaid * 1000) + (aktivJuniorUnpaid * 1000) + (aktivSeniorPaid * 1600) + (aktivSeniorUnpaid * 1600) + (aktivPensionistPaid * 1200) + (aktivPensionistUnpaid * 1200);
    let indtaegtPaid = (passivJuniorSeniorPaid * 500) + (passivPensionistPaid * 375) + (aktivJuniorPaid * 1000) + (aktivSeniorPaid * 1600) + (aktivPensionistPaid * 1200);
    let indtaegtUnpaid = (passivJuniorSeniorUnpaid * 500) + (passivPensionistUnpaid * 375) + (aktivJuniorUnpaid * 1000) + (aktivSeniorUnpaid * 1600) + (aktivPensionistUnpaid * 1200);
    const indtaegtsPotentialleformatted = indtaegtsPotentialle.toLocaleString("da-DK");
    const indtaegtPaidformatted = indtaegtPaid.toLocaleString("da-DK");
    const indtaegtUnpaidformatted = indtaegtUnpaid.toLocaleString("da-DK");

    console.log(`Indtægtspoetentialle: ${indtaegtsPotentialle}`);
    console.log(`Indtægter betalt: ${indtaegtPaid}`);
    console.log(`Indtægter restance: ${indtaegtUnpaid}`);
    const financeHtml =
      //HTML

      `
        
        <h3 class="kasser-finansoversigt-overskrift">Finansoversigt</h3>
        Indtægtspotentiale: ${indtaegtsPotentialleformatted},- kr.<br />
        Indbetalt: ${indtaegtPaidformatted},- kr.<br />
        Restance: ${indtaegtUnpaidformatted},- kr.
        
        `;
    document.querySelector(".show-finance").insertAdjacentHTML("beforeend", financeHtml)
        



}


export { kasserFinance };