const express = require("express");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getAllGraphs,
    deleteUser,
    deleteAnyGraph
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/graphs", protect, adminOnly, getAllGraphs);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.delete("/graphs/:id", protect, adminOnly, deleteAnyGraph);

module.exports = router;