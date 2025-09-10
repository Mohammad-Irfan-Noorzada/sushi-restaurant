require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const sushiRoutes = require("./routes/sushi");
const reservationRoutes = require("./routes/reservation");
const ordersRoutes = require("./routes/orders");
const Sushi = require("./models/Sushis");
const path = require("path");

const app = express();

// Middlewares
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sushi", sushiRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/orders", ordersRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((error) => console.error("MongoDb Error:", error));

// Create sushi
app.post("/api/sushi", async (req, res) => {
  try {
    const newSushi = new Sushi(req.body);
    const savedSushi = await newSushi.save();
    res.status(200).json(savedSushi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete sushi
app.delete("api/sushi/delete", async (req, res) => {
  try {
    await Sushi.deleteOne({});
    res.status(200).json({ message: "Sushi deleted!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete a sushi" });
  }
});

// Create many sushis
app.post("/api/sushi/bulk", async (req, res) => {
  try {
    const sushis = await Sushi.insertMany(req.body);
    res.status(200).json(sushis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete many sushis
app.delete("/api/sushi/bulk/delete", async (req, res) => {
  try {
    await Sushi.deleteMany({});
    res.status(200).json({ message: "All sushis deleted!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete sushis" });
  }
});

// Static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Fetching Middleware to protect routes (create a protected route /api/profile that only logged-in users (with a valid token) can access, and it returns their ID and email.)
const auth = require("./middleware/auth");
app.get("/api/profile", auth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
