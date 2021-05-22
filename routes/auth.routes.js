const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRds = 10;
const User = require("../models/User.model");
// Require user model

// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

router
  .get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("passport/private", { user: req.user });
  })
  .get("/signup", (req, res, next) => res.render("auth/signup"))
  .post("/signup", (req, res, next) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function (err, user) {
        if (err) {
          return res.render("register", { user: User });
        }

        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    );
    // bcrypt.genSalt(saltRds, function (err, salt) {
    //   bcrypt.hash(req.body.password, salt, (err, hash) => {
    //     let user = new User({
    //       username: req.body.username,
    //       password: hash,
    //     });
    //     user
    //       .save()
    //       .then((nU) => {
    //         console.log(nU);
    //         res.redirect("/");
    //       })
    //       .catch((err) => next(err));
    //   });
    // });
  })
  .get("/login", (req, res, next) => {
    res.render("auth/login");
  })
  .post("/login", passport.authenticate("local"), (req, res, next) => {
    res.redirect("/");
    // User.find({ username: req.body.username }).then((userDb) => {
    //   passport.authenticate("local", { failureRedirect: "/" });
    //   console.log(userDb);
    // });
    // res.end();
  });

module.exports = router;
