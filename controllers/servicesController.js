//const business = require("../models/business");
const service = require("../models/services")
module.exports = {


getServices: (req, res, next) => {
    service.find({})
      .then(services => {
        res.locals.services = services;
        next();
      })
      .catch(error => {
        console.log(`Error fetching services: ${error.message}`);
        next(error);
      });
  },

construction: (req, res, next) => {
  res.render("./servicePages/Construction");
},

reviewPage: (req, res, next) => {
  res.render("./servicePages/review")
},

}