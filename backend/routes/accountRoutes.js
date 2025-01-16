// backend/routes/accountRoutes.js
const express = require("express");
const {
  getAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware
const router = express.Router();

router.get("/", authMiddleware, getAccounts);
router.post("/", authMiddleware, addAccount);
router.put("/:id", authMiddleware, updateAccount);
router.delete("/:id", authMiddleware, deleteAccount);

module.exports = router;
