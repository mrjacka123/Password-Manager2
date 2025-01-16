const express = require("express");
const {
  getAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const router = express.Router();

router.get("/", getAccounts);
router.post("/", addAccount);
router.put("/:id", updateAccount); // Update account
router.delete("/:id", deleteAccount); // Delete account

module.exports = router;
