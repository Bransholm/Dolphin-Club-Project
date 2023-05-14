"use strict";

import { singlePageRouter } from "./spa-router.js";

window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running");
  singlePageRouter();
}
