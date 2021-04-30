"use strict";


//user schema start
const mongoose = require("mongoose"),
  { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
  

var userSchema = new Schema (
      {
    email: {
        type: String,
        
        lowercase: true,
        unique: true
      }, 
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
      type: String,
      required: true
      }
    },
        
    accountType: {
        type: String,
        

    }, 
    isAdmin: {
      type: Boolean,
      default: false
    },

      }
  );

  userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
  });

  userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
  });

  
  module.exports = mongoose.model("User", userSchema, "users");

  //end user schema

  
