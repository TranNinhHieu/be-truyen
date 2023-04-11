"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authToken = void 0;
var _jsonwebtoken = require("jsonwebtoken");
// generate token and return it
var generateToken = function generateToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;
  var u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
  return (0, _jsonwebtoken.sign)(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
};

// return basic user details
var getCleanUser = function getCleanUser(user) {
  if (!user) return null;
  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
};
var authToken = {
  generateToken: generateToken,
  getCleanUser: getCleanUser
};
exports.authToken = authToken;