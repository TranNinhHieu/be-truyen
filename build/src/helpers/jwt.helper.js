"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtHelper = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var generateToken = function generateToken(user, secretSignature, tokenLife) {
  return new Promise(function (resolve, reject) {
    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    var userData = {
      _id: user._id,
      isAdmin: user.isAdmin
    };
    // Thực hiện ký và tạo token
    (0, _jsonwebtoken.sign)({
      data: userData
    }, secretSignature, {
      algorithm: 'HS256',
      expiresIn: tokenLife
    }, function (error, token) {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
};
var createActiveToken = function createActiveToken(user, secretSignature, tokenLife) {
  return new Promise(function (resolve, reject) {
    // Thực hiện ký và tạo token
    (0, _jsonwebtoken.sign)({
      data: user
    }, secretSignature, {
      algorithm: 'HS256',
      expiresIn: tokenLife
    }, function (error, token) {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
};
var verifyToken = function verifyToken(token, secretKey) {
  return new Promise(function (resolve, reject) {
    (0, _jsonwebtoken.verify)(token, secretKey, function (error, decoded) {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
var jwtHelper = {
  verifyToken: verifyToken,
  generateToken: generateToken,
  createActiveToken: createActiveToken
};
exports.jwtHelper = jwtHelper;