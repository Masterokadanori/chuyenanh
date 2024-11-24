// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPK1U8CDFlxyoMGFluVzEPM0bZ5ZTkAvk",
  authDomain: "chuyenanh-63ad4.firebaseapp.com",
  databaseURL: "https://chuyenanh-63ad4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chuyenanh-63ad4",
  storageBucket: "chuyenanh-63ad4.firebasestorage.app",
  messagingSenderId: "275605951340",
  appId: "1:275605951340:web:a7ac6455d39b75c4c7d949"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Event listener for the button
document.querySelector("button").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission
  
  // Get user inputs
  const email = document.getElementById("exampleInputEmail1").value.trim();
  const password = document.getElementById("exampleInputPassword1").value.trim();
  

  try {
    // Fetch data from Firebase
    const dbRef = ref(database);
   const snapshot = await get(ref(database, "/")); // Should point to the root containing username and password


    if (snapshot.exists()) {
      const data = snapshot.val();
      
      // Check if inputs match the data
      if (email === String(data.username) && password === String(data.password)) {
        window.location.href = "admin_main.html"
        localStorage.setItem("login", "YES");
    }
     else {
        alert("Invalid email or password.");
      }
    } else {
      alert("No data found in the database.");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    alert("Failed to connect to the database.");
  }
});
