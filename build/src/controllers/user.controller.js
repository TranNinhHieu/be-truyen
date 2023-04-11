"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = require("../services/user.service");
var _constants = require("../utilities/constants");
var _enviroment = require("../config/enviroment");
var _jwt = require("../helpers/jwt.helper");
var _mail = require("../helpers/mail.helper");
var _googleAuthLibrary = require("google-auth-library");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user2 = require("../models/user.model");
var _generatePassword = require("../utilities/generatePassword");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var client = new _googleAuthLibrary.OAuth2Client(_enviroment.env.GOOGLE_CLIENT_ID);
var CLIENT_URL = process.env.NODE_ENV === 'production' ? 'https://comic-riverdev-api.herokuapp.com' : 'http://localhost:8080';
var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userData, accessToken, _refreshToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _user.UserService.login(req.body);
        case 3:
          userData = _context.sent;
          if (!(userData !== null && userData !== undefined)) {
            _context.next = 19;
            break;
          }
          _context.prev = 5;
          _context.next = 8;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.ACCESS_TOKEN_SECRET, _enviroment.env.ACCESS_TOKEN_LIFE);
        case 8:
          accessToken = _context.sent;
          _context.next = 11;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.REFRESH_TOKEN_SECRET, _enviroment.env.REFRESH_TOKEN_LIFE);
        case 11:
          _refreshToken = _context.sent;
          res.cookie('refreshToken', _refreshToken, {
            httpOnly: true,
            path: '/v1/user/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false
          });
          res.status(_constants.HttpStatusCode.OK).json({
            accessToken: accessToken
          });
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json(_context.t0));
        case 19:
          if (!(userData === null)) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Email does not exist!'
          }));
        case 21:
          if (!(userData === undefined)) {
            _context.next = 23;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Username or Password is Wrong.'
          }));
        case 23:
          _context.next = 28;
          break;
        case 25:
          _context.prev = 25;
          _context.t1 = _context["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context.t1.message
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 25], [5, 16]]);
  }));
  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var refreshToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, decoded, userData, accessToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          token = req.cookies.refreshToken;
          if (!token) {
            _context2.next = 18;
            break;
          }
          _context2.prev = 2;
          _context2.next = 5;
          return _jwt.jwtHelper.verifyToken(token, _enviroment.env.REFRESH_TOKEN_SECRET);
        case 5:
          decoded = _context2.sent;
          userData = decoded.data;
          _context2.next = 9;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.ACCESS_TOKEN_SECRET, _enviroment.env.ACCESS_TOKEN_LIFE);
        case 9:
          accessToken = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            accessToken: accessToken
          }));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](2);
          res.status(403).json({
            message: 'Invalid refresh token.'
          });
        case 16:
          _context2.next = 19;
          break;
        case 18:
          return _context2.abrupt("return", res.status(403).send({
            message: 'No token provided.'
          }));
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return function refreshToken(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getFullUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _id, userData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _id = req.jwtDecoded.data._id;
          _context3.next = 4;
          return _user.UserService.getFullUser(_id);
        case 4:
          userData = _context3.sent;
          res.status(_constants.HttpStatusCode.OK).json(userData);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context3.t0.message
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getFullUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var logout = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          try {
            res.clearCookie('refreshToken', {
              path: '/v1/user/refresh-token'
            });
            res.status(_constants.HttpStatusCode.OK).json({
              message: 'Logged out!'
            });
          } catch (error) {
            res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
              message: error.message
            });
          }
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function logout(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var googleLogin = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var tokenId, verify, _verify$payload, email_verified, email, name, picture, password, passwordHash, data, userData, accessToken, _refreshToken2, _accessToken, _refreshToken3;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          tokenId = req.body.tokenId;
          _context5.next = 3;
          return client.verifyIdToken({
            idToken: tokenId,
            audience: _enviroment.env.GOOGLE_CLIENT_ID
          });
        case 3:
          verify = _context5.sent;
          _verify$payload = verify.payload, email_verified = _verify$payload.email_verified, email = _verify$payload.email, name = _verify$payload.name, picture = _verify$payload.picture;
          password = email + _enviroment.env.GOOGLE_SECRET;
          _context5.next = 8;
          return _bcrypt["default"].hash(password, 12);
        case 8:
          passwordHash = _context5.sent;
          if (email_verified) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Email verification failed.'
          }));
        case 11:
          data = {
            email: email,
            password: password
          };
          _context5.prev = 12;
          _context5.next = 15;
          return _user.UserService.login(data);
        case 15:
          userData = _context5.sent;
          if (!(userData !== null && userData !== undefined)) {
            _context5.next = 31;
            break;
          }
          _context5.prev = 17;
          _context5.next = 20;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.ACCESS_TOKEN_SECRET, _enviroment.env.ACCESS_TOKEN_LIFE);
        case 20:
          accessToken = _context5.sent;
          _context5.next = 23;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.REFRESH_TOKEN_SECRET, _enviroment.env.REFRESH_TOKEN_LIFE);
        case 23:
          _refreshToken2 = _context5.sent;
          res.cookie('refreshToken', _refreshToken2, {
            httpOnly: true,
            path: '/v1/user/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false
          });
          return _context5.abrupt("return", res.status(_constants.HttpStatusCode.OK).json({
            accessToken: accessToken,
            refreshToken: _refreshToken2
          }));
        case 28:
          _context5.prev = 28;
          _context5.t0 = _context5["catch"](17);
          return _context5.abrupt("return", res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json(_context5.t0));
        case 31:
          if (!(userData === null)) {
            _context5.next = 52;
            break;
          }
          data = {
            name: name,
            email: email,
            password: passwordHash,
            avatar: picture
          };
          _context5.next = 35;
          return _user.UserService.createNew(data);
        case 35:
          _context5.next = 37;
          return _user.UserService.checkExist(email);
        case 37:
          userData = _context5.sent;
          _context5.prev = 38;
          _context5.next = 41;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.ACCESS_TOKEN_SECRET, _enviroment.env.ACCESS_TOKEN_LIFE);
        case 41:
          _accessToken = _context5.sent;
          _context5.next = 44;
          return _jwt.jwtHelper.generateToken(userData, _enviroment.env.REFRESH_TOKEN_SECRET, _enviroment.env.REFRESH_TOKEN_LIFE);
        case 44:
          _refreshToken3 = _context5.sent;
          res.cookie('refreshToken', _refreshToken3, {
            httpOnly: true,
            path: '/v1/user/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false
          });
          return _context5.abrupt("return", res.status(_constants.HttpStatusCode.OK).json({
            accessToken: _accessToken,
            refreshToken: _refreshToken3
          }));
        case 49:
          _context5.prev = 49;
          _context5.t1 = _context5["catch"](38);
          return _context5.abrupt("return", res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json(_context5.t1));
        case 52:
          if (!(userData === undefined)) {
            _context5.next = 54;
            break;
          }
          return _context5.abrupt("return", res.status(_constants.HttpStatusCode.OK).json({
            message: 'Incorrect password!'
          }));
        case 54:
          _context5.next = 59;
          break;
        case 56:
          _context5.prev = 56;
          _context5.t2 = _context5["catch"](12);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context5.t2.message
          });
        case 59:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[12, 56], [17, 28], [38, 49]]);
  }));
  return function googleLogin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _id, data, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _id = req.jwtDecoded.data._id;
          data = _objectSpread(_objectSpread({}, req.body), {}, {
            updateAt: Date.now()
          });
          _context6.next = 5;
          return _user2.UserModel.update(_id, data);
        case 5:
          result = _context6.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context6.t0.message
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function update(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var likeStatus = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var comicID, _id, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          comicID = req.query.comicID;
          _id = req.jwtDecoded.data._id;
          _context7.next = 5;
          return _user2.UserModel.likeStatus(_id, comicID);
        case 5:
          result = _context7.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context7.t0.message
          });
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function likeStatus(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var followStatus = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var comicID, _id, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          comicID = req.query.comicID;
          _id = req.jwtDecoded.data._id;
          _context8.next = 5;
          return _user2.UserModel.followStatus(_id, comicID);
        case 5:
          result = _context8.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context8.t0.message
          });
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function followStatus(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var updateLikeComic = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var comicID, _id, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          comicID = req.query.comicID;
          _id = req.jwtDecoded.data._id;
          _context9.next = 5;
          return _user2.UserModel.updateLikeComic(_id, comicID);
        case 5:
          result = _context9.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context9.next = 12;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context9.t0.message
          });
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function updateLikeComic(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var updateFollowComic = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var comicID, _id, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          comicID = req.query.comicID;
          _id = req.jwtDecoded.data._id;
          _context10.next = 5;
          return _user2.UserModel.updateFollowComic(_id, comicID);
        case 5:
          result = _context10.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context10.next = 12;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context10.t0.message
          });
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return function updateFollowComic(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var getLikedComics = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var page, _id, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          page = req.query.page;
          _id = req.jwtDecoded.data._id;
          _context11.next = 5;
          return _user.UserService.getLikedComics(_id, page);
        case 5:
          result = _context11.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context11.next = 12;
          break;
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context11.t0.message
          });
        case 12:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return function getLikedComics(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var getFollowedComics = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var page, _id, result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          page = req.query.page;
          _id = req.jwtDecoded.data._id;
          _context12.next = 5;
          return _user.UserService.getFollowedComics(_id, page);
        case 5:
          result = _context12.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context12.next = 12;
          break;
        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context12.t0.message
          });
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 9]]);
  }));
  return function getFollowedComics(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var getQuantityPageLikedComics = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var _id, result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _id = req.jwtDecoded.data._id;
          _context13.next = 4;
          return _user.UserService.getQuantityPageLikedComics(_id);
        case 4:
          result = _context13.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context13.next = 11;
          break;
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context13.t0.message
          });
        case 11:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return function getQuantityPageLikedComics(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var getQuantityPageFollowedComics = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var _id, result;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _id = req.jwtDecoded.data._id;
          _context14.next = 4;
          return _user.UserService.getQuantityPageFollowedComics(_id);
        case 4:
          result = _context14.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context14.next = 11;
          break;
        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context14.t0.message
          });
        case 11:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 8]]);
  }));
  return function getQuantityPageFollowedComics(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var register = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var passwordHash, newUser, activationToken, url;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _bcrypt["default"].hash(req.body.password, 12);
        case 3:
          passwordHash = _context15.sent;
          newUser = {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
          };
          _context15.next = 7;
          return _jwt.jwtHelper.createActiveToken(newUser, _enviroment.env.ACTIVE_TOKEN_SECRET, _enviroment.env.ACTIVE_TOKEN_LIFE);
        case 7:
          activationToken = _context15.sent;
          url = "".concat(CLIENT_URL, "/v1/user/verify-email");
          _context15.next = 11;
          return _mail.mailHelper.sendMail(req.body.email, url, activationToken);
        case 11:
          _context15.next = 13;
          return res.status(_constants.HttpStatusCode.OK).json({
            message: 'Register success! Please activate your email to start.'
          });
        case 13:
          _context15.next = 18;
          break;
        case 15:
          _context15.prev = 15;
          _context15.t0 = _context15["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context15.t0.message
          });
        case 18:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 15]]);
  }));
  return function register(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var verifyEmail = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var verify, decode, userData, checkUser;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          verify = req.body.verify;
          _context16.next = 4;
          return _jwt.jwtHelper.verifyToken(verify, _enviroment.env.ACTIVE_TOKEN_SECRET);
        case 4:
          decode = _context16.sent;
          userData = decode.data;
          _context16.next = 8;
          return _user.UserService.checkExist(userData.email);
        case 8:
          checkUser = _context16.sent;
          if (checkUser) {
            _context16.next = 12;
            break;
          }
          _context16.next = 12;
          return _user2.UserModel.createNew(userData);
        case 12:
          res.redirect('https://comic-riverdev-web.web.app/login');
          _context16.next = 18;
          break;
        case 15:
          _context16.prev = 15;
          _context16.t0 = _context16["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context16.t0.message
          });
        case 18:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 15]]);
  }));
  return function verifyEmail(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
var forgotPassword = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var email, checkUser, password, passwordHash;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          email = req.body.email;
          _context17.next = 4;
          return _user.UserService.checkExist(email);
        case 4:
          checkUser = _context17.sent;
          if (checkUser) {
            _context17.next = 7;
            break;
          }
          return _context17.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            message: 'This email does not exist!'
          }));
        case 7:
          password = (0, _generatePassword.generatePassword)();
          _context17.next = 10;
          return _bcrypt["default"].hash(password, 12);
        case 10:
          passwordHash = _context17.sent;
          _context17.next = 13;
          return _user2.UserModel.update(checkUser._id, {
            password: passwordHash
          });
        case 13:
          _mail.mailHelper.sendMail(email, null, password);
          res.status(_constants.HttpStatusCode.OK).json({
            message: 'Password has been reset, check email to take it !'
          });
          _context17.next = 20;
          break;
        case 17:
          _context17.prev = 17;
          _context17.t0 = _context17["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context17.t0.message
          });
        case 20:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 17]]);
  }));
  return function forgotPassword(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var resetPassword = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var _req$body, password, confirmPassword, _id, passwordHash;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _req$body = req.body, password = _req$body.password, confirmPassword = _req$body.confirmPassword;
          _id = req.jwtDecoded.data._id;
          if (!(password.length < 8 || confirmPassword.length < 8)) {
            _context18.next = 5;
            break;
          }
          return _context18.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            message: 'Password must be at least 8 characters !'
          }));
        case 5:
          if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            _context18.next = 7;
            break;
          }
          return _context18.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            message: 'Password must have number, uppercase letter, lowercase letter and specical character !'
          }));
        case 7:
          if (!(password !== confirmPassword)) {
            _context18.next = 9;
            break;
          }
          return _context18.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            message: 'Confirm password does not match !'
          }));
        case 9:
          _context18.next = 11;
          return _bcrypt["default"].hash(password, 12);
        case 11:
          passwordHash = _context18.sent;
          _context18.next = 14;
          return _user2.UserModel.update(_id, {
            password: passwordHash
          });
        case 14:
          res.status(_constants.HttpStatusCode.OK).json({
            message: 'Password has been changed!'
          });
          _context18.next = 20;
          break;
        case 17:
          _context18.prev = 17;
          _context18.t0 = _context18["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context18.t0.message
          });
        case 20:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 17]]);
  }));
  return function resetPassword(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var removeUser = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var userID, data, result;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          userID = req.body.userID;
          data = {
            updateAt: Date.now(),
            _destroy: true
          };
          _context19.next = 5;
          return _user2.UserModel.update(userID, data);
        case 5:
          result = _context19.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context19.next = 12;
          break;
        case 9:
          _context19.prev = 9;
          _context19.t0 = _context19["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context19.t0.message
          });
        case 12:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 9]]);
  }));
  return function removeUser(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
var getAllUsers = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return _user.UserService.getAllUsers();
        case 3:
          result = _context20.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context20.next = 10;
          break;
        case 7:
          _context20.prev = 7;
          _context20.t0 = _context20["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context20.t0.message
          });
        case 10:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 7]]);
  }));
  return function getAllUsers(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
var signup = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return _user.UserService.signup(req.body);
        case 3:
          result = _context21.sent;
          res.status(_constants.HttpStatusCode.CREATED).json(result);
          _context21.next = 10;
          break;
        case 7:
          _context21.prev = 7;
          _context21.t0 = _context21["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            error: _context21.t0.message
          });
        case 10:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 7]]);
  }));
  return function signup(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
var UserController = {
  login: login,
  refreshToken: refreshToken,
  getFullUser: getFullUser,
  googleLogin: googleLogin,
  logout: logout,
  update: update,
  likeStatus: likeStatus,
  followStatus: followStatus,
  updateLikeComic: updateLikeComic,
  updateFollowComic: updateFollowComic,
  getLikedComics: getLikedComics,
  getFollowedComics: getFollowedComics,
  getQuantityPageFollowedComics: getQuantityPageFollowedComics,
  getQuantityPageLikedComics: getQuantityPageLikedComics,
  register: register,
  verifyEmail: verifyEmail,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  removeUser: removeUser,
  getAllUsers: getAllUsers,
  signup: signup
};
exports.UserController = UserController;