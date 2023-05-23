"use strict";

console.log("Javascript is running");

import { singlePageRouter } from "./spa-router.js";
import { showPerformanceForm } from "./performance-tracking.js";
// import { showSection } from "./router.js";
// import { updateMemberGrid } from "./getMembers.js";
import { startIndmelding } from "./formand.js";
import { showMemberPerformances } from "./performance-overview.js";
window.addEventListener("load", start);

function start() {
  singlePageRouter();
  // showPerformanceForm();
  showMemberPerformances();
  // startIndmelding();
}
