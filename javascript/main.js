"use strict";

import { singlePageRouter } from "./spa-router.js";
import { showPreformanceForm } from "./preformance-trackign.js";

window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running");
  singlePageRouter();
  showPreformanceForm();
}
