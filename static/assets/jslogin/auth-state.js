import { auth, db } from "/static/assets/jslogin/firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        let name = user.email.split('@')[0];
        let balance = 0;

        if (docSnap.exists()) {
            const data = docSnap.data();
            name = data.name || name;
            balance = parseFloat(data.balance) || 0;
        }

        // Update DOM elements with user data
        const elementsName = document.querySelectorAll('.display-name');
        const elementsBalance = document.querySelectorAll('.display-balance');
        const elementsCombined = document.querySelectorAll('.display-combined');

        elementsName.forEach(el => el.innerText = name);
        elementsBalance.forEach(el => el.innerText = `$${balance.toFixed(2)}`);
        elementsCombined.forEach(el => el.innerText = `${name} | $${balance.toFixed(2)}`);

        // Provide user data globally for other scripts if needed
        window.currentUser = { uid: user.uid, email: user.email, name, balance };
        document.dispatchEvent(new Event('userDataLoaded'));

    } else {
        // Redirect if not logged in
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/Register') && window.location.pathname !== '/') {
            window.location.href = "/login";
        }
    }
});

// Attach logout functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = "/login";
            });
        });
    });
});
