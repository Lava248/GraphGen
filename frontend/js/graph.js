// =========================
// GET HTML ELEMENTS
// =========================

const graphTitle = document.getElementById("graphTitle");
const xData = document.getElementById("xData");
const yData = document.getElementById("yData");
const graphType = document.getElementById("graphType");

const graphCanvas = document.getElementById("graphCanvas");

const generateButton =
    document.getElementById("generateGraph");


// =========================
// CHART VARIABLE
// =========================

let graphChart = null;


// =========================
// GENERATE GRAPH
// =========================

generateButton.addEventListener("click", function () {

    // Get title

    const title =
        graphTitle.value.trim();


    // Get X-axis data

    const labels =
        xData.value
            .split(",")
            .map(item => item.trim());


    // Get Y-axis data

    const values =
        yData.value
            .split(",")
            .map(item => Number(item.trim()));


    // =========================
    // VALIDATION
    // =========================

    if (!title) {

        alert("Please enter graph title.");

        return;
    }


    if (labels.length === 0) {

        alert("Please enter X-axis data.");

        return;
    }


    if (values.length === 0) {

        alert("Please enter Y-axis data.");

        return;
    }


    if (labels.length !== values.length) {

        alert(
            "X-axis and Y-axis data must have the same number of values."
        );

        return;
    }


    // =========================
    // REMOVE OLD GRAPH
    // =========================

    if (graphChart !== null) {

        graphChart.destroy();

    }


    // =========================
    // CREATE NEW GRAPH
    // =========================

    graphChart = new Chart(graphCanvas, {

        type: graphType.value,

        data: {

            labels: labels,

            datasets: [

                {

                    label: title,

                    data: values

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: title

                }

            }

        }

    });

});