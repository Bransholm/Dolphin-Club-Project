import { updateMemberGrid } from "./getMembers.js";
let medlemmer 

async function kasser() {
    medlemmer = await updateMemberGrid();
    showMemberPaidStatus(medlemmer);
    document.querySelector("#filter-betaling").addEventListener("change", filterbetalt);
}

function filterbetalt(event) {
    const valgte = event.target.value;
    let result;
    if (valgte === "betalt") {
        result = medlemmer.filter(filterByPaid);
    } else if (valgte === "ubetalt") {
        result = medlemmer.filter(filterByNotPaid);
    } else if (valgte === "alle-betalinger") {
        result = medlemmer;
    }

    function filterByPaid(valgteMedlem) {
        const paid = valgteMedlem.betalt;
        return paid === true;
    }
     
    function filterByNotPaid(valgteMedlem) {
        console.log("filterByNotPaid kørt");
        return valgteMedlem.betalt === false;
    }

    showMemberPaidStatus(result);
    console.log(result);
}


function showMemberPaidStatus(medlemmerListe) {
    document.querySelector(".show-kasser").textContent = "";
    for (let medlem of medlemmerListe) {
        const medlemHTML =
          /*html*/
          `

            <div class="show-kasser-user">
            Navn: ${medlem.navn} <br />
            Køn: ${medlem.køn} <br />
            Fødselsdag: ${medlem.fødselsdato} <br />
            Kategori: ${medlem.kategori} <br />
            Betalt: ${medlem.betalt}
            Betalt: ${medlem.betalt}
            </div>

            `;
        document.querySelector(".show-kasser").insertAdjacentHTML("beforeend", medlemHTML);
    }
}

export { kasser }