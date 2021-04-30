const User = require("../models/user"),
Business = require("../models/business"),

getBusinessParams = body => {
    return {
      email: body.email,
      companyName: body.companyName,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      service: body.service
        
    }
};

getReviewParams = body => {
    return {
        review: {
            comment: body.comment,
            rating: body.rating
        }
    };
};


module.exports = {

create: (req, res, next) => {
    Business.create(req.body).then((result) => {
        console.log(result);
        next();
    }).catch((err) => {
        next(err);
    });
},

getBusinesses: (req, res, next) => {
    Business.find({})
      .then(business => {
        res.locals.business = business;
        next();
      })
      .catch(error => {
        console.log(`Error fetching business: ${error.message}`);
        next(error);
      });
  },

getOneBusiness: (req, res, next) => {
let businessId = req.params.id;
Business.findById(businessId)
    .then(business => {
    res.locals.business = business;
    next();
    })
    .catch(error => {
    console.log(`Error fetching subscriber by ID: ${error.message}`);
    next(error);
    });
  }, 

postReview: (req, res, next) => {
    let business = req.params.id,
    review = getReviewParams(req.body);

    Business.findByIdAndUpdate(business, {
    $set: review
  })
  .then(Business => {
    res.locals.redirect = `/find`;
    res.locals.business = Business;
    next();
  })
  .catch(error => {
    console.log(`Error updating user by ID: ${error.message}`);
    next(error);
  });
}

}

// if (req.skip) next();
//     let newUser = new User(getUserParams(req.body));
//     console.log("got user params");
//     User.register(newUser, req.body.password, (e, user) => {
//     if (user) {
//         //req.flash("success", `${user.firstName}'s account created successfully!`);
//         res.locals.redirect = "/";
//         next();
//     } else {
//         //req.flash("error", `Failed to create user account because: ${e.message}.`);
//         res.locals.redirect = "/createAccount";
//         console.log(e);
//         next();