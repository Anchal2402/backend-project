const express = require("express");
const router = express.Router();

const {
  addHoliday,
  getHolidays,
  getTodayHoliday
} = require("../controllers/holidayController");

router.post("/add", addHoliday);
router.get("/", getHolidays);
router.get("/today", getTodayHoliday);

module.exports = router;