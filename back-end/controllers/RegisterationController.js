const RegisterModel = require("../models/RegisterationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postRegisters = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await RegisterModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("Email already exists");
    }
    // hashing the password

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new RegisterModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json("Account is created successfully");
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
};

const getAllRegisters = async (req, res) => {
  try {
    const allRegisters = await RegisterModel.find();
    return res.status(200).json(allRegisters);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret-key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllRegisters,
  postRegisters,
  verifyLogin,
  changePassword,
};
