"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePassword = void 0;
var generatePassword = function generatePassword() {
  var password = randomPassword();
  while (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) password = randomPassword();
  return password;
};
exports.generatePassword = generatePassword;
var randomPassword = function randomPassword() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};