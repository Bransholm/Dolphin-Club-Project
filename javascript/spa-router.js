function singlePageRouter() {
  window.addEventListener("haschange", viewChange);
  viewChange();
}

function viewChange() {
  let hashLink = "#velkommen-side";

  if (location.hash) {
    hashLink = location.hash;
  }

  hideAllViews();

  document.querySelector(hashLink).classList.add("active");
  setActiveLink(hashLink);
}

function setActiveLink(view) {
  const link = document.querySelector(`a.view-link[href="${view}"]`);

  console.log(link);

  if (link) {
    link.classList.add("active");
  }
}

function hideAllViews() {
  //   console.log(link);

  document
    .querySelectorAll(".view-content")
    .forEach((link) => link.classList.remove("active"));

  document
    .querySelectorAll(".view-link")
    .forEach((link) => link.classList.remove("active"));

  //   remove .active for all .view-content elements (all views) and .view-link elements (all links)
}

export { singlePageRouter };
