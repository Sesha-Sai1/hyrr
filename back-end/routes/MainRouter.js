const express = require("express");

const router = express.Router();

const router1 = require("./RegisterationRouter");
const router2 = require("./PostRouter");

router.use("/Register", router1);
router.use("/post", router2);

module.exports = router;
