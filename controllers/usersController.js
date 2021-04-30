"use strict";

const {check, validationResult} = require("express-validator");
const User = require("../models/user");
const passport = require("passport");


const getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      email: body.email,
      accountType: body.accountType
      
    }; 
    
  };
  
module.exports = {
  
  
create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    console.log("got user params");
    User.register(newUser, req.body.password, (e, user) => {
    if (user) {
        //req.flash("success", `${user.firstName}'s account created successfully!`);
        res.locals.redirect = "/";
        next();
    } else {
        //req.flash("error", `Failed to create user account because: ${e.message}.`);
        res.locals.redirect = "/createAccount";
        console.log(e);
        next();
    }
    });
},

redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next()
    },


authenticate: passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: `Signed in as ${User.email} !`
    }),

logout: (req, res, next) => {
    req.logout();
    res.locals.redirect = "/";
    next();
  },

index: (req, res, next) => {
    User.find()
        .then(user => {
        res.locals.user = user;
         next();
         })
        .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
        })
    },

indexView: (req, res) => {
    res.render("allUsers");
    },

}

