"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChapterService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chapter = require("../models/chapter.model");
var _mongodb = require("../config/mongodb");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var chapterCollectionName = 'chapters';
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var checkExist, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (!(data.chap * 1 <= 0)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", undefined);
        case 5:
          _context.next = 7;
          return (0, _mongodb.getDB)().collection(chapterCollectionName).findOne({
            comicID: data.comicID,
            chap: data.chap * 1,
            _destroy: false
          });
        case 7:
          checkExist = _context.sent;
          if (!checkExist) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", null);
        case 10:
          data.chap = data.chap * 1;
        case 11:
          _context.next = 13;
          return _chapter.ChapterModel.createNew(data);
        case 13:
          result = _context.sent;
          return _context.abrupt("return", result);
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, data) {
    var updateData, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          updateData = _objectSpread(_objectSpread({}, data), {}, {
            updateAt: Date.now()
          });
          _context2.next = 4;
          return _chapter.ChapterModel.update(id, updateData);
        case 4:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function update(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllChapterOfComic = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _chapter.ChapterModel.getAllChapterOfComic(comicID);
        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", result);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getAllChapterOfComic(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getFullChapter = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(comicID, chap) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _chapter.ChapterModel.getFullChapter(comicID, chap);
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
  return function getFullChapter(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var getQuantityChapter = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _chapter.ChapterModel.getQuantityChapter(comicID);
        case 3:
          result = _context5.sent;
          return _context5.abrupt("return", result);
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw new Error(_context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function getQuantityChapter(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
var getNewComics = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _chapter.ChapterModel.getNewComics();
        case 3:
          result = _context6.sent;
          return _context6.abrupt("return", result);
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getNewComics() {
    return _ref6.apply(this, arguments);
  };
}();
var ChapterService = {
  createNew: createNew,
  update: update,
  getAllChapterOfComic: getAllChapterOfComic,
  getFullChapter: getFullChapter,
  getQuantityChapter: getQuantityChapter,
  getNewComics: getNewComics
};
exports.ChapterService = ChapterService;