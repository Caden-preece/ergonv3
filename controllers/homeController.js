"use strict";

module.exports = {
    index: (req, res, next) => {
        res.render("index");
    },

    loginPage: (req, res, next) => {
        res.render("login");
    },

    createPage: (req, res, next) => {
        res.render("createAccount");
    },

    createBPage: (req, res, next) => {
        res.render("createBusiness");
    },

    findPage: (req, res, next) => {
        res.render("find");
    },

    profilePage: (req, res, next) => {
        res.render("profile");
    },

    
}