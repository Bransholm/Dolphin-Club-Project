import { runUpdate } from "./formand.js";

const endpoint =
  "https://delfin-semesterproj-default-rtdb.europe-west1.firebasedatabase.app";

async function deleteMember(id) {
  try {
    const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Et medlem er blevet slettet fra databasen!");
      document.querySelector("#successfull-deleteMember").showModal();
      runUpdate();
    } else {
      console.error("Failed to delete member:", response.status);
    }
  } catch (error) {
    console.error("An error occurred during delete:", error);
  }
}

function deleteMemberClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteMember(id);

  console.log(deleteMember);
}

function closeDeleteSuccessWindow() {
  // document.querySelector("#order-form").reset();
  document.querySelector("#successfull-deleteMember").close();
}

export { deleteMember, deleteMemberClicked, closeDeleteSuccessWindow };
