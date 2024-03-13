const express = require("express");
const getAllPosts = require("../controllers/PostController");
const anthenticateToken = require("../middlewares/middleware");

const router2 = express.Router();

router2.get("/getAllPosts", anthenticateToken, getAllPosts);

module.exports = router2;
