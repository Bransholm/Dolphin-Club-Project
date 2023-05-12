
function singlePageRouter() {
window.addEventListener("haschange", togglePageView);
togglePageView()
}

function togglePageView(){
let hashLink = "#velkommen"; 

if(location.hash){
    hashLink = location.hash
}

hideAllViews()

}

document.querySelector("#hashLink").classList.add("unblock")
setActiveLink(hashLink);

function setActiveLink(view){
    // const link = document.querySelector(...)
    if(link){
        link.classList.add("unblock")
    }
}

function hideAllViews(){

}


export{singlePageRouter}