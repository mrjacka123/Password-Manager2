const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  accountPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Account", accountSchema);
