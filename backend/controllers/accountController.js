const Account = require("../models/accountModel");

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve accounts" });
  }
};

// Add a new account
const addAccount = async (req, res) => {
  const { username, password, acctype } = req.body;

  if (!username || !password || !acctype) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAccount = new Account({ username, password, acctype });
    await newAccount.save();
    res.status(201).json({ message: "Account added successfully", newAccount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add account" });
  }
};

// Update an account
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { username, password, acctype } = req.body;

  if (!username || !password || !acctype) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { username, password, acctype },
      { new: true } // Return the updated document
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res
      .status(200)
      .json({ message: "Account updated successfully", updatedAccount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update account" });
  }
};

// Delete an account
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

module.exports = { getAccounts, addAccount, updateAccount, deleteAccount };
