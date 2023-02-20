const express = require("express");
const User = require("./user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { isAuth } = require("../../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json("Error getting all users");
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    console.log(createdUser);
    return res.status(201).json(createdUser);
  } catch (error) {
    return next("Error register user", error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    console.log("user", userDB);
    if (!userDB) {
      return res.status(404).json("User don't exists");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      console.log("pass", req.body.password);
      const token = generateSign(userDB._id, userDB.email);
      console.log("token", token);
      return res.status(200).json({ token, userDB });
    } else {
      return res.status(200).json("The password is not correct");
    }
  } catch (error) {
    return res.status(500).json("Error login user");
  }
});
router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/checksession", (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/checksession", [isAuth], (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;