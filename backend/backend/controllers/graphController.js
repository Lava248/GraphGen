const Graph = require("../models/Graph");

const saveGraph = async (req, res) => {
    try {
        const { title, graphType, labels, data } = req.body;

        if (!title || !graphType) {
            return res.status(400).json({
                message: "Title and graph type are required"
            });
        }

        const graph = await Graph.create({
            user: req.user,
            title,
            graphType,
            labels,
            data
        });

        res.status(201).json({
            message: "Graph saved successfully",
            graph
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getMyGraphs = async (req, res) => {
    try {
        const graphs = await Graph.find({
            user: req.user
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Graphs fetched successfully",
            graphs
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const deleteGraph = async (req, res) => {
    try {
        const graph = await Graph.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!graph) {
            return res.status(404).json({
                message: "Graph not found"
            });
        }

        await graph.deleteOne();

        res.status(200).json({
            message: "Graph deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    saveGraph,
    getMyGraphs,
    deleteGraph
};