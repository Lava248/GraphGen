const User = require("../models/User");
const Graph = require("../models/Graph");


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            users
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get all graphs
const getAllGraphs = async (req, res) => {
    try {
        const graphs = await Graph.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            graphs
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Delete user's graphs first
        await Graph.deleteMany({
            user: user._id
        });

        await user.deleteOne();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Delete any graph
const deleteAnyGraph = async (req, res) => {
    try {
        const graph = await Graph.findById(req.params.id);

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
    getAllUsers,
    getAllGraphs,
    deleteUser,
    deleteAnyGraph
};