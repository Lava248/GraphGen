const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    saveGraph,
    getMyGraphs,
    deleteGraph
} = require("../controllers/graphController");

const router = express.Router();

router.post("/save", protect, saveGraph);

router.get("/my-graphs", protect, getMyGraphs);

router.delete("/:id", protect, deleteGraph);

module.exports = router;