function singlePageRouter() {
  window.addEventListener("haschange", togglePageView);
  togglePageView();
}

function togglePageView() {
  let hashLink = "#velkommen-side";
  console.log(hashLink);

  if (location.hash) {
    hashLink = location.hash;
  }

  hideAllViews();

  document.querySelector("#hashLink").classList.add("active");
  setActiveLink(hashLink);
}

function setActiveLink(view) {
  const link = document.querySelector(`a.view-link[href="${view}"]`);
  if (link) {
    link.classList.add("active");
  }
}

function hideAllViews() {
  document
    .querySelector(".view-content")
    .forEach((link) => link.classList.remove("active"));

  document
    .querySelector(".view-link")
    .forEach((link) => link.classList.remove("active"));

  // remove .active for all .view-content elements (all views) and .view-link elements (all links)
}

export { singlePageRouter };
