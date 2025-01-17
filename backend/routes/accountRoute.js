const express = require("express");
const {
  addAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");

const router = express.Router();

router.post("/add", addAccount);
router.get("/all", getAccounts);
router.put("/update/:id", updateAccount);
router.delete("/delete/:id", deleteAccount);

module.exports = router;
