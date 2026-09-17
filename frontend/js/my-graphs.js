document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const graphsContainer =
            document.getElementById(
                "graphsContainer"
            );


        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        /* =====================================================
           TOKEN
        ===================================================== */

        const token =
            localStorage.getItem("token");


        if (!token) {

            window.location.href =
                "login.html";

            return;

        }



        /* =====================================================
           LOAD GRAPHS
        ===================================================== */

        async function loadGraphs() {

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/graphs/my-graphs",
                        {
                            method: "GET",

                            headers: {
                                "Authorization":
                                    `Bearer ${token}`
                            }
                        }
                    );


                const result =
                    await response.json();


                /* =================================================
                   INVALID TOKEN
                ================================================= */

                if (response.status === 401) {

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    window.location.href =
                        "login.html";

                    return;

                }


                /* =================================================
                   SERVER ERROR
                ================================================= */

                if (!response.ok) {

                    graphsContainer.innerHTML = `

                        <p class="empty-message">

                            Failed to load your graphs.

                        </p>

                    `;

                    return;

                }


                const graphs =
                    result.graphs;


                /* =================================================
                   NO GRAPHS
                ================================================= */

                if (
                    !graphs ||
                    graphs.length === 0
                ) {

                    graphsContainer.innerHTML = `

                        <p class="empty-message">

                            You haven't saved any graphs yet.

                        </p>

                    `;

                    return;

                }


                /* =================================================
                   CLEAR LOADING
                ================================================= */

                graphsContainer.innerHTML = "";


                /* =================================================
                   CREATE GRAPH CARDS
                ================================================= */

                graphs.forEach(
                    function (graph) {


                        const card =
                            document.createElement(
                                "div"
                            );


                        card.className =
                            "graph-card";


                        /* =================================================
                           CARD HTML
                        ================================================= */

                        card.innerHTML = `

                            <div
                                class="graph-card-header">

                                <h2>
                                    ${escapeHTML(
                                        graph.title
                                    )}
                                </h2>

                                <span
                                    class="graph-type">

                                    ${escapeHTML(
                                        graph.graphType
                                    )}

                                </span>

                            </div>


                            <div
                                class="graph-preview">

                                <canvas
                                    id="chart-${graph._id}">
                                </canvas>

                            </div>


                            <div
                                class="graph-data">

                                <p>

                                    <strong>
                                        Labels:
                                    </strong>

                                    ${graph.labels
                                        .map(
                                            escapeHTML
                                        )
                                        .join(", ")}

                                </p>


                                <p>

                                    <strong>
                                        Data:
                                    </strong>

                                    ${graph.data.join(", ")}

                                </p>

                            </div>


                            <button
                                class="delete-graph"
                                data-id="${graph._id}">

                                Delete Graph

                            </button>

                        `;


                        graphsContainer.appendChild(
                            card
                        );


                        /* =================================================
                           CREATE CHART
                        ================================================= */

                        createGraphPreview(
                            graph
                        );

                    }
                );


                /* =================================================
                   DELETE BUTTONS
                ================================================= */

                document
                    .querySelectorAll(
                        ".delete-graph"
                    )
                    .forEach(
                        function (button) {

                            button.addEventListener(
                                "click",
                                function () {

                                    const graphId =
                                        button.dataset.id;

                                    deleteGraph(
                                        graphId
                                    );

                                }
                            );

                        }
                    );


            } catch (error) {

                console.error(
                    "Load graphs error:",
                    error
                );


                graphsContainer.innerHTML = `

                    <p class="empty-message">

                        Unable to connect to server.

                    </p>

                `;

            }

        }



        /* =====================================================
           CREATE CHART PREVIEW
        ===================================================== */

        function createGraphPreview(
            graph
        ) {


            const canvas =
                document.getElementById(
                    `chart-${graph._id}`
                );


            if (!canvas) {
                return;
            }


            let chartType =
                graph.graphType;


            /* =================================================
               CHART.JS TYPE FIX
            ================================================= */

            if (
                chartType === "polarArea"
            ) {

                chartType =
                    "polarArea";

            }


            if (
                chartType === "doughnut"
            ) {

                chartType =
                    "doughnut";

            }


            if (
                ![
                    "line",
                    "bar",
                    "pie",
                    "doughnut",
                    "radar",
                    "polarArea"
                ].includes(chartType)
            ) {

                chartType =
                    "bar";

            }


            /* =================================================
               DATA
            ================================================= */

            const labels =
                graph.labels || [];


            const values =
                graph.data || [];


            /* =================================================
               CHART
            ================================================= */

            new Chart(
                canvas,
                {

                    type: chartType,

                    data: {

                        labels: labels,

                        datasets: [

                            {

                                label:
                                    graph.title,

                                data: values,

                                backgroundColor: [

                                    "rgba(76, 231, 182, 0.65)",

                                    "rgba(92, 177, 246, 0.65)",

                                    "rgba(255, 190, 92, 0.65)",

                                    "rgba(255, 110, 140, 0.65)",

                                    "rgba(170, 120, 255, 0.65)"

                                ],

                                borderColor:
                                    "#4ce7b6",

                                borderWidth: 2,

                                tension: 0.3

                            }

                        ]

                    },


                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        animation: {

                            duration: 700

                        },

                        plugins: {

                            legend: {

                                display:
                                    chartType !== "bar"

                            }

                        },


                        scales:
                            (
                                chartType === "pie" ||
                                chartType === "doughnut" ||
                                chartType === "polarArea" ||
                                chartType === "radar"
                            )
                                ? {}
                                : {

                                    x: {

                                        ticks: {

                                            color:
                                                "#9da9b8"

                                        },

                                        grid: {

                                            color:
                                                "rgba(255,255,255,0.05)"

                                        }

                                    },

                                    y: {

                                        ticks: {

                                            color:
                                                "#9da9b8"

                                        },

                                        grid: {

                                            color:
                                                "rgba(255,255,255,0.05)"

                                        }

                                    }

                                }

                    }

                }
            );

        }



        /* =====================================================
           DELETE GRAPH
        ===================================================== */

        async function deleteGraph(
            graphId
        ) {


            const confirmDelete =
                confirm(
                    "Are you sure you want to delete this graph?"
                );


            if (!confirmDelete) {
                return;
            }


            try {

                const response =
                    await fetch(
                        `http://localhost:5000/api/graphs/${graphId}`,
                        {
                            method: "DELETE",

                            headers: {
                                "Authorization":
                                    `Bearer ${token}`
                            }
                        }
                    );


                const result =
                    await response.json();


                /* =================================================
                   INVALID TOKEN
                ================================================= */

                if (
                    response.status === 401
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    window.location.href =
                        "login.html";

                    return;

                }


                /* =================================================
                   ERROR
                ================================================= */

                if (!response.ok) {

                    alert(
                        result.message ||
                        "Failed to delete graph."
                    );

                    return;

                }


                /* =================================================
                   SUCCESS
                ================================================= */

                alert(
                    "Graph deleted successfully!"
                );


                loadGraphs();


            } catch (error) {

                console.error(
                    "Delete graph error:",
                    error
                );


                alert(
                    "Unable to connect to server."
                );

            }

        }



        /* =====================================================
           LOGOUT
        ===================================================== */

        logoutButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                window.location.href =
                    "login.html";

            }
        );



        /* =====================================================
           HTML ESCAPE
        ===================================================== */

        function escapeHTML(
            value
        ) {

            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }



        /* =====================================================
           START
        ===================================================== */

        loadGraphs();

    }
);