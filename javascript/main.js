"use strict";

console.log("Javascript is running");

import { singlePageRouter } from "./spa-router.js";
import { showPreformanceForm } from "./preformance-tracking.js";
import { showSection } from "./router.js";
import { updateMemberGrid } from "./getMembers.js";
import { startIndmelding, showMembers } from "./formand.js";
window.addEventListener("load", start);

function start() {
  singlePageRouter();
  showPreformanceForm();
  startIndmelding();
  const memberlist = updateMemberGrid();
  console.log(memberlist);
  showMembers(memberlist);
}
