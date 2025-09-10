const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  action: {
    // What happened (e.g., "login_failed").
    type: String,
    required: true,
  },

  details: {
    // Extra info like IP, email, order ID, etc.
    type: Object,
    default: {},
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Auditlog", auditLogSchema);
