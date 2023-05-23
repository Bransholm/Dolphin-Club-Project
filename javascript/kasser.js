import { updateMemberGrid } from "./getMembers.js";
let medlemmer 

async function kasser() {
    medlemmer = await updateMemberGrid();
    showMemberPaidStatus();
    document.querySelector("#filter-betaling").addEventListener("change", filterbetalt);
}

function filterbetalt(event) {
    const valgte = event.target.value;
    if (valgte === "betalt") {
        medlemmer.filter(filterByPaid);
    } else if (valgte === "ejbetalt") {
        medlemmer.filter(filterByNotPaid);
    } else if (valgte === "alle-betalinger") {
        showMemberPaidStatus();
    }

    function filterByPaid() {
        console.log("filterByPaid kørt");

    }
     
    function filterByNotPaid() {
        console.log("filterByNotPaid kørt");

    }







    
        
        

}


function showMemberPaidStatus() {
    for (let medlem of medlemmer) {
        const medlemHTML =
          /*html*/
          `
            <div>${medlem.navn}</div>
            <div>${medlem.betalt}</div>
            `;
        document.querySelector(".show-kasser").insertAdjacentHTML("beforeend", medlemHTML);
    }
}

export { kasser }




// li>Adresse: ${memberObject.adresse} ${memberObject.postnummer}</li>



// 1. Udregning aktive 18-60 1600
// 2. Vis paid/unpaid