document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const formMessage = document.getElementById("formMessage");


    // =========================
    // SHOW / HIDE PASSWORD
    // =========================

    document.querySelectorAll(".password-toggle").forEach((button) => {

        button.addEventListener("click", () => {

            const target = document.getElementById(
                button.dataset.target
            );

            if (target.type === "password") {
                target.type = "text";
                button.textContent = "Hide";
            } else {
                target.type = "password";
                button.textContent = "Show";
            }

        });

    });


    // =========================
    // REGISTER FORM
    // =========================

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        formMessage.textContent = "";
        formMessage.style.color = "#ff8a8a";


        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();


        // =========================
        // FRONTEND VALIDATION
        // =========================

        if (password.value !== confirmPassword.value) {

            formMessage.textContent =
                "Passwords do not match.";

            return;
        }


        if (password.value.length < 6) {

            formMessage.textContent =
                "Password must contain at least 6 characters.";

            return;
        }


        // =========================
        // SEND DATA TO BACKEND
        // =========================

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password: password.value
                    })
                }
            );


            const data = await response.json();


            // =========================
            // ERROR
            // =========================

            if (!response.ok) {

                formMessage.textContent =
                    data.message || "Registration failed.";

                return;
            }


            // =========================
            // SUCCESS
            // =========================

            formMessage.style.color = "#00d9ff";

            formMessage.textContent =
                "Account created successfully!";


            // Clear form
            registerForm.reset();


            // Redirect to login
            setTimeout(() => {

                window.location.href = "login.html";

            }, 1000);


        } catch (error) {

            formMessage.textContent =
                "Unable to connect to server.";

            console.error(error);

        }

    });

});