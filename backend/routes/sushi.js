const express = require("express");
const router = express.Router();
const Sushi = require("../models/Sushis");

router.get("/", async (req, res) => {
  try {
    const sushis = await Sushi.find();
    res.json(sushis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
