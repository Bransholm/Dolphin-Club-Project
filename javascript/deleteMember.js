import { runUpdate } from "./formand.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

async function deleteMember(id) {
  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Et medlem er blevet slettet fra databasen!");
    runUpdate();
  }
}

function deleteMemberClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteMember(id);

  console.log(deleteMember);
}

export { deleteMember, deleteMemberClicked };
