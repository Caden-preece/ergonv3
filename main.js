"use strict";

const businessController = require("./controllers/businessController");


//Import required libraries 
const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  
//CONTROLLERS
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
//   businessController = require("./controllers/businessController"),
  servicesController = require("./controllers/servicesController"),
//   reviewController = require("./controllers/reviewController"),
//MODELS
  User = require("./models/user");
//   Business = require("./models/business");
  
//Connect to Atlas
  mongoose.connect(
    "mongodb+srv://cadenpreecE:caDen@cluster0.61xxy.mongodb.net/Ergonv3?retryWrites=true&w=majority", //Atlas connection string here
     { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
   );
   
   const db = mongoose.connection;
   db.once("open", () => {
     console.log("Successfully connected to MongoDB using Mongoose!");
   });
   
   // App Settings
   app.set("port", process.env.PORT || 3000);
   app.set("view engine", "ejs");
   app.use(express.static("public"));
   app.use(layouts);
   app.use(express.urlencoded({ extended: false }));
   app.use(methodOverride("_method", {methods: ["POST", "GET"] }));
   app.use(express.json());
   app.use(cookieParser("secret_passcode"));
   app.use(
     expressSession({
       secret: "secret_passcode",
       cookie: {
         maxAge: 4000000
       },
       resave: false,
       saveUninitialized: false
     })
   );
   
   //Configure Passport
   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(User.createStrategy());
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
   app.use(connectFlash());

// Middleware function to attach user and flash info to res.locals for easy access in views
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  //res.locals.flashMessages = req.flash();
  next();
});

//HOMECONTROLLER
app.get("/", homeController.index),
app.get("/login", homeController.loginPage),
app.get("/createAccount", homeController.createPage),
app.get("/find", servicesController.getServices, homeController.findPage),
app.get("/profile", homeController.profilePage),
app.get("/createBusiness", servicesController.getServices, homeController.createBPage),


//Create account & Login
app.post("/create", usersController.create, usersController.redirectView),
app.post("/login", usersController.authenticate),
app.get("/logout", usersController.logout, usersController.redirectView),

//Create Business
app.post("/createB", businessController.create, homeController.profilePage),

//Generate Services Pages
app.get("/find/Construction", businessController.getBusinesses, servicesController.construction),

//Review Page
app.get("/find/:id/review", businessController.getOneBusiness, servicesController.reviewPage),
app.put("/find/:id/review",businessController.postReview, usersController.redirectView),

//Admin Tasks
app.get("/allUsers", usersController.index, usersController.indexView),
app.get("/allBusinesses", )








// ************ Launch server **************
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });



//BOOTSTRAP
// (function() {
// /**
//    * Easy selector helper function
//    */
//  const select = (el, all = false) => {
//     el = el.trim()
//     if (all) {
//       return [...document.querySelectorAll(el)]
//     } else {
//       return document.querySelector(el)
//     }
//   }

//   /**
//    * Easy event listener function
//    */
//   const on = (type, el, listener, all = false) => {
//     let selectEl = select(el, all)
//     if (selectEl) {
//       if (all) {
//         selectEl.forEach(e => e.addEventListener(type, listener))
//       } else {
//         selectEl.addEventListener(type, listener)
//       }
//     }
//   }

//   /**
//    * Easy on scroll event listener 
//    */
//   const onscroll = (el, listener) => {
//     el.addEventListener('scroll', listener)
//   }

//   /**
//    * Navbar links active state on scroll
//    */
//   let navbarlinks = select('#navbar .scrollto', true)
//   const navbarlinksActive = () => {
//     let position = window.scrollY + 200
//     navbarlinks.forEach(navbarlink => {
//       if (!navbarlink.hash) return
//       let section = select(navbarlink.hash)
//       if (!section) return
//       if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
//         navbarlink.classList.add('active')
//       } else {
//         navbarlink.classList.remove('active')
//       }
//     })
//   }
//   window.addEventListener('load', navbarlinksActive)
//   onscroll(document, navbarlinksActive)

//   /**
//    * Scrolls to an element with header offset
//    */
//   const scrollto = (el) => {
//     let header = select('#header')
//     let offset = header.offsetHeight

//     let elementPos = select(el).offsetTop
//     window.scrollTo({
//       top: elementPos - offset,
//       behavior: 'smooth'
//     })
//   }

//   /**
//    * Toggle .header-scrolled class to #header when page is scrolled
//    */
//   let selectHeader = select('#header')
//   if (selectHeader) {
//     const headerScrolled = () => {
//       if (window.scrollY > 100) {
//         selectHeader.classList.add('header-scrolled')
//       } else {
//         selectHeader.classList.remove('header-scrolled')
//       }
//     }
//     window.addEventListener('load', headerScrolled)
//     onscroll(document, headerScrolled)
//   }

//   /**
//    * Back to top button
//    */
//   let backtotop = select('.back-to-top')
//   if (backtotop) {
//     const toggleBacktotop = () => {
//       if (window.scrollY > 100) {
//         backtotop.classList.add('active')
//       } else {
//         backtotop.classList.remove('active')
//       }
//     }
//     window.addEventListener('load', toggleBacktotop)
//     onscroll(document, toggleBacktotop)
//   }

//   /**
//    * Mobile nav toggle
//    */
//   on('click', '.mobile-nav-toggle', function(e) {
//     select('#navbar').classList.toggle('navbar-mobile')
//     this.classList.toggle('bi-list')
//     this.classList.toggle('bi-x')
//   })

//   /**
//    * Mobile nav dropdowns activate
//    */
//   on('click', '.navbar .dropdown > a', function(e) {
//     if (select('#navbar').classList.contains('navbar-mobile')) {
//       e.preventDefault()
//       this.nextElementSibling.classList.toggle('dropdown-active')
//     }
//   }, true)

//   /**
//    * Scrool with ofset on links with a class name .scrollto
//    */
//   on('click', '.scrollto', function(e) {
//     if (select(this.hash)) {
//       e.preventDefault()

//       let navbar = select('#navbar')
//       if (navbar.classList.contains('navbar-mobile')) {
//         navbar.classList.remove('navbar-mobile')
//         let navbarToggle = select('.mobile-nav-toggle')
//         navbarToggle.classList.toggle('bi-list')
//         navbarToggle.classList.toggle('bi-x')
//       }
//       scrollto(this.hash)
//     }
//   }, true)

//   /**
//    * Scroll with ofset on page load with hash links in the url
//    */
//   window.addEventListener('load', () => {
//     if (window.location.hash) {
//       if (select(window.location.hash)) {
//         scrollto(window.location.hash)
//       }
//     }
//   });

//   /**
//    * Porfolio isotope and filter
//    */
//   window.addEventListener('load', () => {
//     let portfolioContainer = select('.portfolio-container');
//     if (portfolioContainer) {
//       let portfolioIsotope = new Isotope(portfolioContainer, {
//         itemSelector: '.portfolio-item',
//       });

//       let portfolioFilters = select('#portfolio-flters li', true);

//       on('click', '#portfolio-flters li', function(e) {
//         e.preventDefault();
//         portfolioFilters.forEach(function(el) {
//           el.classList.remove('filter-active');
//         });
//         this.classList.add('filter-active');

//         portfolioIsotope.arrange({
//           filter: this.getAttribute('data-filter')
//         });
//         portfolioIsotope.on('arrangeComplete', function() {
//           AOS.refresh()
//         });
//       }, true);
//     }

//   });

//   /**
//    * Initiate portfolio lightbox 
//    */
//   const portfolioLightbox = GLightbox({
//     selector: '.portfolio-lightbox'
//   });

//   /**
//    * Portfolio details slider
//    */
//   new Swiper('.portfolio-details-slider', {
//     speed: 400,
//     loop: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'bullets',
//       clickable: true
//     }
//   });

//   /**
//    * Testimonials slider
//    */
//   new Swiper('.testimonials-slider', {
//     speed: 600,
//     loop: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false
//     },
//     slidesPerView: 'auto',
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'bullets',
//       clickable: true
//     },
//     breakpoints: {
//       320: {
//         slidesPerView: 1,
//         spaceBetween: 20
//       },

//       1200: {
//         slidesPerView: 3,
//         spaceBetween: 20
//       }
//     }
//   });

//   /**
//    * Animation on scroll
//    */
//   window.addEventListener('load', () => {
//     AOS.init({
//       duration: 1000,
//       easing: 'ease-in-out',
//       once: true,
//       mirror: false
//     })
//   });

// })()