"use strict";

console.log("Javascript is running");

import { singlePageRouter } from "./spa-router.js";
import { showPerformanceForm} from "./preformance-tracking.js";
// import { showSection } from "./router.js";
// import { updateMemberGrid } from "./getMembers.js";
import { startIndmelding } from "./formand.js";
import { showMemberPerformances} from "./preformance-overview.js";
window.addEventListener("load", start);

function start() {
  singlePageRouter();
  showPerformanceForm();
  showMemberPerformances();
  // startIndmelding();
}
