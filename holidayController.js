const Holiday = require("../models/Holiday");

// ➕ ADD HOLIDAY (AUTO ya manual dono)
const addHoliday = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    // agar frontend se data nahi aaya toh auto create
    const holiday = await Holiday.create({
      title: title || "Auto Holiday",
      date: date || new Date().toISOString().split("T")[0],
      description: description || "Auto Added"
    });

    res.status(201).json({
      success: true,
      data: holiday
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 📄 GET ALL
const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();

    res.json({
      success: true,
      count: holidays.length,
      data: holidays
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 📅 TODAY (NO NULL VERSION 🔥)
const getTodayHoliday = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const holidays = await Holiday.find({ date: today });

    // 🔥 FIX: null kabhi nahi aayega
    if (holidays.length === 0) {
      return res.json({
        success: true,
        date: today,
        message: "No holiday today",
        data: []
      });
    }

    res.json({
      success: true,
      date: today,
      data: holidays
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addHoliday,
  getHolidays,
  getTodayHoliday
};