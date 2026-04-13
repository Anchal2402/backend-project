const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await Admin.findOne({ email });
    if (exist) return res.json({ msg: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.json({ msg: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; // ✅ yaha close kiya function

// LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: admin._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token,
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ export bhi add karna hoga
module.exports = { registerAdmin, loginAdmin };