"use strict";
// Node Modules
const express = require("express");
const router = express.Router();

// App Modules
const User = require("../Models/User");

router.post("/users", (req, res, next) => {
  const { email, name } = req.body;

  const user = new User(name, email);

  res.json(user);
});

router.get("/users", (req, res, next) => {
  const userOne = new User("Alexander", "fake@gmail.com");
  const userTwo = new User("Ryan", "fakeagain@gmail.com");
  res.json({ userOne, userTwo });
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
