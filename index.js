const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// routes
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const holidayRoutes = require("./routes/holidayRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// route mounting
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/holiday", holidayRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});