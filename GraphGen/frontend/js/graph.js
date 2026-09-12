// =========================
// AUTHENTICATION CHECK
// =========================

const pageToken = localStorage.getItem("token");

if (!pageToken) {
    alert("Please login to create a graph.");
    window.location.href = "login.html";
}
// =========================
// GET HTML ELEMENTS
// =========================


const backgroundColor =
    document.getElementById("backgroundColor");

const borderColor =
    document.getElementById("borderColor");

const showGrid =
    document.getElementById("showGrid");

const showLegend =
    document.getElementById("showLegend");

const graphTitle =
    document.getElementById("graphTitle");

const xAxisTitle =
    document.getElementById("xAxisTitle");

const yAxisTitle =
    document.getElementById("yAxisTitle");

const xData =
    document.getElementById("xData");

const yData =
    document.getElementById("yData");

const graphType =
    document.getElementById("graphType");

const graphCanvas =
    document.getElementById("graphCanvas");

const generateButton =
    document.getElementById("generateGraph");

const downloadButton =
    document.getElementById("downloadGraph");

const saveButton =
    document.getElementById("saveGraph");

const resetButton =
    document.getElementById("resetGraph");

const colorMode =
    document.getElementById("colorMode");


// =========================
// CHART VARIABLE
// =========================

let graphChart = null;


// =========================
// COLORS FOR MULTI-SLICE
// GRAPHS
// =========================

const sliceColors = [
    "#4ce7b6",
    "#5cb1f6",
    "#a78bfa",
    "#f472b6",
    "#facc15",
    "#fb923c",
    "#38bdf8",
    "#34d399"
];


// =========================
// SMART COLOR FUNCTION
// =========================

function getSmartColors(values) {

    // =========================
    // CUSTOM COLORS
    // =========================

    if (colorMode.value === "custom") {

        return {
            background: backgroundColor.value,
            border: borderColor.value
        };

    }


    const highest =
        Math.max(...values);

    const lowest =
        Math.min(...values);


    // =========================
    // HIGHLIGHT HIGHEST & LOWEST
    // =========================

    if (colorMode.value === "highlight") {

        const background =
            values.map(value => {

                if (value === highest) {
                    return "#4ce7b6";
                }

                if (value === lowest) {
                    return "#ff5c5c";
                }

                return backgroundColor.value;

            });


        const border =
            values.map(value => {

                if (value === highest) {
                    return "#4ce7b6";
                }

                if (value === lowest) {
                    return "#ff5c5c";
                }

                return borderColor.value;

            });


        return {
            background: background,
            border: border
        };

    }


    // =========================
    // VALUE GRADIENT
    // =========================

    if (colorMode.value === "gradient") {

        const min =
            lowest;

        const max =
            highest;


        const background =
            values.map(value => {

                const ratio =
                    max === min
                        ? 0.5
                        : (value - min) / (max - min);


                const red =
                    Math.round(255 * (1 - ratio));

                const green =
                    Math.round(255 * ratio);


                return `rgb(${red}, ${green}, 120)`;

            });


        return {
            background: background,
            border: background
        };

    }

}


// =========================
// GENERATE GRAPH
// =========================

generateButton.addEventListener(
    "click",
    function () {

        // =========================
        // GET TITLE
        // =========================

        const title =
            graphTitle.value.trim();


        // =========================
        // GET X DATA
        // =========================

        const labels =
            xData.value
                .split(",")
                .map(item => item.trim());


        // =========================
        // GET Y DATA
        // =========================

        const values =
            yData.value
                .split(",")
                .map(item => Number(item.trim()));


        // =========================
        // VALIDATION
        // =========================

        if (!title) {

            alert(
                "Please enter graph title."
            );

            return;

        }


        if (!xData.value.trim()) {

            alert(
                "Please enter X-axis data."
            );

            return;

        }


        if (!yData.value.trim()) {

            alert(
                "Please enter Y-axis data."
            );

            return;

        }


        if (labels.length !== values.length) {

            alert(
                "X-axis and Y-axis data must have the same number of values."
            );

            return;

        }


        if (labels.some(label => label === "")) {

            alert(
                "X-axis data cannot contain empty values."
            );

            return;

        }


        if (values.some(value => Number.isNaN(value))) {

            alert(
                "Y-axis data must contain only numbers."
            );

            return;

        }


        // =========================
        // REMOVE OLD GRAPH
        // =========================

        if (graphChart !== null) {

            graphChart.destroy();

            graphChart = null;

        }


        // =========================
        // GET GRAPH TYPE
        // =========================

        const selectedType =
            graphType.value;


        // =========================
        // GET SMART COLORS
        // =========================

        const smartColors =
            getSmartColors(values);


        let datasetBackground;
        let datasetBorder;


        // =========================
        // MULTI-SLICE GRAPHS
        // =========================

        if (
            selectedType === "pie" ||
            selectedType === "doughnut" ||
            selectedType === "polarArea"
        ) {

            if (colorMode.value === "custom") {

                datasetBackground =
                    valuesForSlices(values.length);

                datasetBorder =
                    "#07111f";

            } else {

                datasetBackground =
                    smartColors.background;

                datasetBorder =
                    smartColors.border;

            }

        }

        // =========================
        // OTHER GRAPHS
        // =========================

        else {

            datasetBackground =
                smartColors.background;

            datasetBorder =
                smartColors.border;

        }


        // =========================
        // DATASET
        // =========================

        const dataset = {

            label: title,

            data: values,

            backgroundColor:
                datasetBackground,

            borderColor:
                datasetBorder,

            borderWidth: 2

        };


        // =========================
        // LINE GRAPH SETTINGS
        // =========================

        if (selectedType === "line") {

            dataset.tension = 0.4;

            dataset.pointRadius = 5;

            dataset.pointHoverRadius = 7;

            dataset.fill = false;

        }


        // =========================
        // BAR GRAPH SETTINGS
        // =========================

        if (selectedType === "bar") {

            dataset.borderRadius = 8;

            dataset.borderSkipped = false;

        }


        // =========================
        // CHART OPTIONS
        // =========================

        const chartOptions = {

            responsive: true,

            maintainAspectRatio: false,


            // =========================
            // ANIMATION
            // =========================

            animation: {

                duration: 1000,

                easing: "easeOutQuart"

            },


            // =========================
            // PLUGINS
            // =========================

            plugins: {

                title: {

                    display: true,

                    text: title,

                    color: "#ffffff",

                    font: {

                        size: 18,

                        weight: "600"

                    },

                    padding: {

                        bottom: 20

                    }

                },


                legend: {

                    display:
                        showLegend.checked,

                    labels: {

                        color: "#cbd5e1",

                        padding: 18,

                        usePointStyle: true,

                        font: {

                            size: 13

                        }

                    }

                },


                tooltip: {

                    backgroundColor:
                        "rgba(7, 17, 31, 0.95)",

                    titleColor:
                        "#ffffff",

                    bodyColor:
                        "#cbd5e1",

                    borderColor:
                        "rgba(76, 231, 182, 0.4)",

                    borderWidth: 1,

                    padding: 12,

                    displayColors: true

                }

            }

        };


        // =========================
        // SCALES
        // =========================

        if (
            selectedType !== "pie" &&
            selectedType !== "doughnut" &&
            selectedType !== "polarArea"
        ) {

            chartOptions.scales = {

                x: {

                    title: {

                        display:
                            xAxisTitle.value.trim() !== "",

                        text:
                            xAxisTitle.value,

                        color:
                            "#ffffff"

                    },


                    grid: {

                        display:
                            showGrid.checked,

                        color:
                            "rgba(255, 255, 255, 0.08)"

                    },


                    ticks: {

                        color:
                            "#9da9b8"

                    }

                },


                y: {

                    title: {

                        display:
                            yAxisTitle.value.trim() !== "",

                        text:
                            yAxisTitle.value,

                        color:
                            "#ffffff"

                    },


                    grid: {

                        display:
                            showGrid.checked,

                        color:
                            "rgba(255, 255, 255, 0.08)"

                    },


                    ticks: {

                        color:
                            "#9da9b8"

                    }

                }

            };

        }


        // =========================
        // CREATE CHART
        // =========================

        graphChart =
            new Chart(graphCanvas, {

                type:
                    selectedType,

                data: {

                    labels:
                        labels,

                    datasets: [
                        dataset
                    ]

                },

                options:
                    chartOptions

            });

    }
);


// =========================
// LIVE CUSTOMIZATION
// =========================

function updateGraph() {

    if (graphChart === null) {

        return;

    }


    const currentType =
        graphChart.config.type;


    const values =
        graphChart.data.datasets[0].data;


    // =========================
    // GET SMART COLORS
    // =========================

    const smartColors =
        getSmartColors(values);


    // =========================
    // UPDATE COLORS
    // =========================

    if (
        currentType === "pie" ||
        currentType === "doughnut" ||
        currentType === "polarArea"
    ) {

        if (colorMode.value === "custom") {

            graphChart.data.datasets[0].backgroundColor =
                valuesForSlices(values.length);

            graphChart.data.datasets[0].borderColor =
                "#07111f";

        } else {

            graphChart.data.datasets[0].backgroundColor =
                smartColors.background;

            graphChart.data.datasets[0].borderColor =
                smartColors.border;

        }

    } else {

        graphChart.data.datasets[0].backgroundColor =
            smartColors.background;

        graphChart.data.datasets[0].borderColor =
            smartColors.border;

    }


    // =========================
    // UPDATE LEGEND
    // =========================

    graphChart.options.plugins.legend.display =
        showLegend.checked;


    // =========================
    // UPDATE GRID
    // =========================

    if (graphChart.options.scales) {

        if (graphChart.options.scales.x) {

            graphChart.options.scales.x.grid.display =
                showGrid.checked;

        }


        if (graphChart.options.scales.y) {

            graphChart.options.scales.y.grid.display =
                showGrid.checked;

        }

    }


    // =========================
    // UPDATE AXIS TITLES
    // =========================

    if (graphChart.options.scales) {

        if (graphChart.options.scales.x) {

            graphChart.options.scales.x.title.display =
                xAxisTitle.value.trim() !== "";

            graphChart.options.scales.x.title.text =
                xAxisTitle.value;

        }


        if (graphChart.options.scales.y) {

            graphChart.options.scales.y.title.display =
                yAxisTitle.value.trim() !== "";

            graphChart.options.scales.y.title.text =
                yAxisTitle.value;

        }

    }


    // =========================
    // UPDATE GRAPH
    // =========================

    graphChart.update();

}


// =========================
// SLICE COLORS FUNCTION
// =========================

function valuesForSlices(count) {

    return Array.from(

        { length: count },

        (_, index) =>
            sliceColors[
            index % sliceColors.length
            ]

    );

}


// =========================
// BACKGROUND COLOR EVENT
// =========================

backgroundColor.addEventListener(
    "input",
    updateGraph
);


// =========================
// BORDER COLOR EVENT
// =========================

borderColor.addEventListener(
    "input",
    updateGraph
);


// =========================
// COLOR MODE EVENT
// =========================

colorMode.addEventListener(
    "change",
    updateGraph
);


// =========================
// GRID EVENT
// =========================

showGrid.addEventListener(
    "change",
    updateGraph
);


// =========================
// LEGEND EVENT
// =========================

showLegend.addEventListener(
    "change",
    updateGraph
);


// =========================
// X-AXIS TITLE EVENT
// =========================

xAxisTitle.addEventListener(
    "input",
    updateGraph
);


// =========================
// Y-AXIS TITLE EVENT
// =========================

yAxisTitle.addEventListener(
    "input",
    updateGraph
);


// =========================
// DOWNLOAD GRAPH
// =========================

downloadButton.addEventListener(
    "click",
    function () {

        if (graphChart === null) {

            alert(
                "Please generate a graph first."
            );

            return;

        }


        const link =
            document.createElement("a");


        link.href =
            graphChart.toBase64Image();


        link.download =
            "graph.png";


        link.click();

    }
);


// =========================
// RESET GRAPH
// =========================

resetButton.addEventListener(
    "click",
    function () {

        graphTitle.value = "";

        xAxisTitle.value = "";

        yAxisTitle.value = "";

        xData.value = "";

        yData.value = "";


        graphType.value =
            "line";


        colorMode.value =
            "custom";


        backgroundColor.value =
            "#4ce7b6";


        borderColor.value =
            "#5cb1f6";


        showGrid.checked =
            true;


        showLegend.checked =
            true;


        if (graphChart !== null) {

            graphChart.destroy();

            graphChart = null;

        }

    }
);

// =========================
// SAVE GRAPH
// =========================

saveButton.addEventListener(
    "click",
    async function () {

        // Check if graph exists
        if (graphChart === null) {

            alert(
                "Please generate a graph first."
            );

            return;

        }


        // Get JWT token
        const token =
            localStorage.getItem("token");


        // User must be logged in
        if (!token) {

            alert(
                "Please login before saving a graph."
            );

            window.location.href =
                "login.html";

            return;

        }


        // Get graph data
        const title =
            graphTitle.value.trim();

        const labels =
            xData.value
                .split(",")
                .map(item => item.trim());

        const values =
            yData.value
                .split(",")
                .map(item => Number(item.trim()));

        // Validate graph data

        if (!title) {
            alert("Please enter a graph title.");
            return;
        }

        if (labels.length === 0 || values.length === 0) {
            alert("Please enter labels and data.");
            return;
        }

        if (labels.length !== values.length) {
            alert("Number of labels and data values must be the same.");
            return;
        }

        if (values.some(value => Number.isNaN(value))) {
            alert("Data values must be numbers.");
            return;
        }

        const selectedType =
            graphType.value;


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/graphs/save",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            title: title,
                            graphType: selectedType,
                            labels: labels,
                            data: values
                        })
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                alert(
                    result.message ||
                    "Failed to save graph."
                );

                return;

            }


            alert(
                "Graph saved successfully!"
            );


        } catch (error) {

            console.error(
                "Save graph error:",
                error
            );

            alert(
                "Unable to connect to server."
            );

        }

    }
);