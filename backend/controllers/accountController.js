const Account = require("../models/accountModel");

// Add a new account
const addAccount = async (req, res) => {
  try {
    const { userEmail, accountType, accountPassword } = req.body;

    const newAccount = new Account({
      userEmail,
      accountType,
      accountPassword,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update account
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountType, accountPassword } = req.body;

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { accountType, accountPassword },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addAccount, getAccounts, updateAccount, deleteAccount };
