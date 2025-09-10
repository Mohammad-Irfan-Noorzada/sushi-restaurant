const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// For email verification after signing up
exports.signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = new User({ fullname, email, password });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    user.verificationTokenExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verifcationLink = `http://localhost:5173/verify/${verificationToken}`;

    await transporter.sendMail({
      from: `"Sushi Restaurant 🍣" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify your email",
      html: `<p>Please click the link to verify: <a href="${verifcationLink}">${verifcationLink}</a></p>`,
    });

    res.status(200).json({
      message: "Signup successful, check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint of verifaction
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token!" });

    user.isVerified = true; // The account is now confirmed as verified.
    user.verificationToken = undefined; // Remove the token from DB so it can’t be reused.
    user.verificationTokenExpire = undefined; // Remove expiry field, since no longer needed.
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
