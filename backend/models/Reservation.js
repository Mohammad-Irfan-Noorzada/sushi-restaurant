const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      res: "User",
      required: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    people: {
      type: Number,
      min: 1,
    },

    table: {
      type: String,
      required: true,
      enum: ["Fine | $500", "Gold | $1000", "Royalty | $1500"],
    },

    date: {
      type: Date,
      trim: true,
    },

    time: {
      type: String,
      trim: true,
    },

    comments: {
      type: String,
      trim: true,
    },

    newsletter: {
      type: Boolean,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
