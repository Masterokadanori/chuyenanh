// Replace with your OAuth token and Base ID
const oauthToken =
  "patS6d4jgjj26Xyg3.45519d60735a827fa7019ab2bab904a63ef4b0cf89571cc9eb4aac95fa13f8cd";
const baseId = "appyiCOaZVqs4QVNL";
const tableName = "exercise"; // Replace with your table name

// Airtable API endpoint
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// Function to count records in the first offset and create divs accordingly
async function createDivsForRecords() {
  try {
    // Fetch records from Airtable
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${oauthToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Get the count of records in this single offset
    const recordCount = data.records.length;
    console.log(`Number of records in this page: ${recordCount}`);

    // Container div to hold all record divs (optional)
    const container = document.getElementById("hold");

    // Loop to create a div for each record
    for (let i = 0; i < recordCount; i++) {
      const recordDiv = document.createElement("div");
      recordDiv.className = "item";

      const number = document.createElement("h2");
      number.textContent = i + 1;

      const name_div = document.createElement("h2");

      // Access the "name" field from Airtable and add it to the name_div
      const name = data.records[i].fields.Name;
      name_div.textContent = name ? name : "No name available"; // Handle case if "name" is empty

      // Append each record div to the container
      recordDiv.appendChild(number);
      recordDiv.appendChild(name_div);
      //Button to edit and delete
      if (localStorage.getItem("login") === "YES") {
        const button_edit = document.createElement("img");
        const button_delete = document.createElement("img");

        button_delete.src =
          "https://cdn-icons-png.flaticon.com/512/3334/3334328.png";
        button_edit.src =
          "https://cdn-icons-png.flaticon.com/512/7794/7794212.png";

        button_edit.style.width = "40%";
        button_delete.style.width = "40%";
        button_delete.className = "delete_but";
        button_edit.className = "edit_but";

        recordDiv.appendChild(button_edit);
        recordDiv.appendChild(button_delete);
      }
      container.appendChild(recordDiv);
    }

    // Append the container to the document body (if it's not already in the HTML)
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
  }
}

// Call the function
createDivsForRecords();
