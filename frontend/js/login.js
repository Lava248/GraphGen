// =========================
// LOGIN FORM
// =========================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Get form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;


    // =========================
    // CHECK FIELDS
    // =========================

    if (!email || !password) {

        alert("Please enter email and password.");

        return;
    }


    try {

        // =========================
        // LOGIN API REQUEST
        // =========================

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        // Convert response to JSON
        const data = await response.json();


        // =========================
        // CHECK LOGIN ERROR
        // =========================

        if (!response.ok) {

            alert(data.message || "Login failed.");

            return;
        }


        // =========================
        // SAVE LOGIN DATA
        // =========================

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        // =========================
        // LOGIN SUCCESS
        // =========================

        alert("Login successful!");

        window.location.href = "create.html";


    } catch (error) {

        console.error("Login error:", error);

        alert(
            "Unable to connect to the server. Please try again."
        );

    }

});