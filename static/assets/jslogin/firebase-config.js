import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANC155Vx8sr81FgYv1P0IvIljaIUadNIk",
  authDomain: "whiskyhot-4200a.firebaseapp.com",
  projectId: "whiskyhot-4200a",
  storageBucket: "whiskyhot-4200a.firebasestorage.app",
  messagingSenderId: "421875181539",
  appId: "1:421875181539:web:718c36e73c8598ceef62d6",
  measurementId: "G-8XJ7Q2DT7R"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
