"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = require("../services/user.service");
var _constants = require("../utilities/constants");
var _formatData = require("../utilities/formatData");
var _joi = _interopRequireDefault(require("joi"));
var login = function login(req, res, next) {
  try {
    var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
    // return 400 status if username/password is not exist
    if (!email || !password) {
      return res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
        error: true,
        message: 'Username or Password required.'
      });
    } else if (password.length < 8) return res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
      error: true,
      message: 'Password must be at least 8 charaters.'
    });else next();
  } catch (error) {
    res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    });
  }
};
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body2, email, password, confirmPassword, name, exist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, confirmPassword = _req$body2.confirmPassword, name = _req$body2.name;
          if (!(!email || !password || !confirmPassword || !name)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Please fill in all fields!'
          }));
        case 6:
          _context.next = 8;
          return _user.UserService.checkExist(email);
        case 8:
          exist = _context.sent;
          if (!exist) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Email already exists!'
          }));
        case 11:
          if (!(password.length < 8)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Password must be at least 8 charaters!'
          }));
        case 13:
          if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Password must have number, uppercase letter, lowercase letter and specical character!'
          }));
        case 15:
          if (!(password !== confirmPassword)) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Confirm password not match!'
          }));
        case 17:
          if (!(name.length < 5)) {
            _context.next = 19;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Name must be at least 5 charaters!'
          }));
        case 19:
          if ((0, _formatData.validateEmail)(email)) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: true,
            message: 'Invalid email!'
          }));
        case 21:
          next();
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context.t0.message
          });
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24]]);
  }));
  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var createNew = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var condition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          condition = _joi["default"].object({
            _id: _joi["default"].string().required(),
            name: _joi["default"].string().required().min(3).max(16).trim(),
            email: _joi["default"].string().email({
              minDomainSegments: 2,
              tlds: {
                allow: ['com']
              }
            }).required(),
            avatar: _joi["default"].string().uri({
              scheme: [/\https?/]
            }).required()
          });
          _context2.prev = 1;
          _context2.next = 4;
          return condition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            error: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return function createNew(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var UserValidation = {
  login: login,
  register: register,
  createNew: createNew
};
exports.UserValidation = UserValidation;