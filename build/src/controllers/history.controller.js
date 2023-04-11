"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _history = require("../services/history.service");
var _constants = require("../utilities/constants");
var addHistory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _history.HistoryService.addHistory(req.body);
        case 3:
          result = _context.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function addHistory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getHistory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var page, _id, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = req.query.page;
          _id = req.jwtDecoded.data._id;
          _context2.next = 5;
          return _history.HistoryService.getHistory(_id, page);
        case 5:
          result = _context2.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context2.t0.message
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getHistory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var removeHistory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query, comicID, chap, _id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, comicID = _req$query.comicID, chap = _req$query.chap;
          _id = req.jwtDecoded.data._id;
          _context3.next = 5;
          return _history.HistoryService.removeHistory(_id, comicID, chap);
        case 5:
          result = _context3.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context3.t0.message
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function removeHistory(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var removeAllHistory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _id = req.jwtDecoded.data._id;
          _context4.next = 4;
          return _history.HistoryService.removeAllHistory(_id);
        case 4:
          result = _context4.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context4.t0.message
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function removeAllHistory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var HistoryController = {
  getHistory: getHistory,
  addHistory: addHistory,
  removeHistory: removeHistory,
  removeAllHistory: removeAllHistory
};
exports.HistoryController = HistoryController;