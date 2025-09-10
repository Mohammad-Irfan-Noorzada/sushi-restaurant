const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Signup, Login, Resetpassword
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // For verifcation email
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash Password before saving
// Before a user is saved to MongoDB, do something...
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it’s new or changed. Prevents re-hashing the password every time the user updates their profile or email.
  const salt = await bcrypt.genSalt(10); // Salt ensures that even if two people have the same password, their hashes will look different.
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Calls the next middleware (or saves the user). Without calling next(), Mongoose would get stuck and never finish saving.
});

module.exports = mongoose.model("User", userSchema);
