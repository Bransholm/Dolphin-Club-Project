"use strict";

console.log("Javascript is running");

import { singlePageRouter } from "./spa-router.js";
import { showPreformanceForm } from "./preformance-tracking.js";
import { showSection } from "./router.js";

window.addEventListener("load", start);

function start() {
  singlePageRouter();
  showPreformanceForm();
}
