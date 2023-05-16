"use strict";

console.log("Javascript is running");

// import { singlePageRouter } from "./spa-router.js";
import { showPreformanceForm } from "./preformance-tracking.js";

window.addEventListener("load", start);

function start() {
  // singlePageRouter();
  showPreformanceForm();
  addEs();
}

function addEs() {
  document
    .querySelector("button1")
    .addEventListener("click", showSection("section1"));
  document
    .querySelector("button2")
    .addEventListener("click", showSection("section2"));
}

function showSection(sectionId) {
  // Hide all sections
  var sections = document.getElementsByClassName("show-hide-section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  // Show the selected section
  var section = document.getElementById(sectionId);
  section.style.display = "block";
}
