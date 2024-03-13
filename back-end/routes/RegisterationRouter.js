const express = require("express");
const {
  postRegisters,
  getAllRegisters,
  verifyLogin,
  changePassword,
} = require("../controllers/RegisterationController");

const router1 = express.Router();

router1.post("/register", postRegisters);

router1.get("/getAllRegisters", getAllRegisters);
router1.post("/verify", verifyLogin);
router1.post("/pass", changePassword);

module.exports = router1;
