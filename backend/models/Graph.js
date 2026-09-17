const mongoose = require("mongoose");

const graphSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        graphType: {
            type: String,
            required: true
        },

        labels: {
            type: [String],
            default: []
        },

        data: {
            type: [Number],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Graph = mongoose.model("Graph", graphSchema);

module.exports = Graph;