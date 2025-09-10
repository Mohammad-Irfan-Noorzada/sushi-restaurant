const Auditlog = require("../models/Auditlog");

const logAction = async (userId, action, details = {}) => {
  try {
    await Auditlog.create({ userId, action, details });
  } catch (error) {
    console.error("Audit log error:", error);
  }
};

module.exports = logAction;
