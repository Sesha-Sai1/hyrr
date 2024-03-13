const express = require("express");
const getAllPosts = require("../controllers/PostController");

const router2 = express.Router();

router2.get("/getAllPosts", getAllPosts);

module.exports = router2;
