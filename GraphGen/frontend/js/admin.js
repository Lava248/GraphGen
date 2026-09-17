const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));


// =========================
// CHECK LOGIN
// =========================

if (!token || !user) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// =========================
// CHECK ADMIN
// =========================

if (user.role !== "admin") {

    alert("Admin access required.");

    window.location.href = "create.html";

}


// =========================
// LOAD USERS
// =========================

async function loadUsers() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/admin/users",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Failed to load users.");

            return;
        }

        const users = data.users;

        document.getElementById("totalUsers").textContent =
            users.length;

        const tableBody =
            document.getElementById("usersTableBody");

        tableBody.innerHTML = "";

        users.forEach(user => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.name}</td>

                <td>${user.email}</td>

                <td>${user.role}</td>

                <td>
                    ${new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td>
                    ${
                        user.role === "admin"
                        ? "-"
                        : `
                            <button
                                class="delete-btn"
                                onclick="deleteUser('${user._id}')">
                                Delete
                            </button>
                          `
                    }
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

}


// =========================
// LOAD GRAPHS
// =========================

async function loadGraphs() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/admin/graphs",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Failed to load graphs.");

            return;
        }

        const graphs = data.graphs;

        document.getElementById("totalGraphs").textContent =
            graphs.length;

        const tableBody =
            document.getElementById("graphsTableBody");

        tableBody.innerHTML = "";

        graphs.forEach(graph => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${graph.title}</td>

                <td>${graph.graphType}</td>

                <td>
                    ${
                        graph.user
                        ? graph.user.name
                        : "Unknown"
                    }
                </td>

                <td>
                    ${new Date(graph.createdAt).toLocaleDateString()}
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteGraph('${graph._id}')">
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

}


// =========================
// DELETE USER
// =========================

async function deleteUser(userId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/admin/users/${userId}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Failed to delete user.");

            return;
        }

        alert("User deleted successfully.");

        loadUsers();
        loadGraphs();

    } catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

}


// =========================
// DELETE GRAPH
// =========================

async function deleteGraph(graphId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this graph?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/admin/graphs/${graphId}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Failed to delete graph.");

            return;
        }

        alert("Graph deleted successfully.");

        loadGraphs();

    } catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

}


// =========================
// LOGOUT
// =========================

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    });


// =========================
// INITIAL LOAD
// =========================

loadUsers();
loadGraphs();