const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formMessage = document.getElementById("formMessage");

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            formMessage.textContent = data.message || "Login failed";
            return;
        }

        // Store JWT
        localStorage.setItem("token", data.token);

        // Store user information
        localStorage.setItem("user", JSON.stringify(data.user));

        formMessage.style.color = "#00d9ff";
        formMessage.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "create.html";
        }, 800);

    } catch (error) {

        formMessage.textContent =
            "Unable to connect to server.";

        console.error(error);
    }
});


/* =========================
   SHOW / HIDE PASSWORD
========================= */

const passwordToggle = document.querySelector(".password-toggle");

passwordToggle.addEventListener("click", () => {

    const passwordInput =
        document.getElementById(passwordToggle.dataset.target);

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        passwordToggle.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        passwordToggle.textContent = "Show";

    }

});