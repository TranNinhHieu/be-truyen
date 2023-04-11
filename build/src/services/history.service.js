"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var _history = require("../models/history.model");
var addHistory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var checkExist, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _mongodb2.getDB)().collection('histories').findOne({
            userID: (0, _mongodb.ObjectID)(data.userID),
            comicID: (0, _mongodb.ObjectID)(data.comicID),
            chap: data.chap * 1
          });
        case 3:
          checkExist = _context.sent;
          if (!checkExist) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", null);
        case 6:
          _context.next = 8;
          return _history.HistoryModel.addHistory(data);
        case 8:
          result = _context.sent;
          return _context.abrupt("return", result);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function addHistory(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getHistory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userID, page) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _history.HistoryModel.getHistory(userID, page);
        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getHistory(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var removeHistory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userID, comicID, chap) {
    var data, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          data = {
            updateAt: Date.now(),
            _destroy: true
          };
          _context3.next = 4;
          return _history.HistoryModel.removeHistory(userID, comicID, chap, data);
        case 4:
          result = _context3.sent;
          return _context3.abrupt("return", result);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function removeHistory(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var removeAllHistory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userID) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _history.HistoryModel.removeAllHistory(userID);
        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function removeAllHistory(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
var HistoryService = {
  getHistory: getHistory,
  addHistory: addHistory,
  removeHistory: removeHistory,
  removeAllHistory: removeAllHistory
};
exports.HistoryService = HistoryService;