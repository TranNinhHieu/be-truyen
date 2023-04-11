"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComicService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _comic = require("../models/comic.model");
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var _formatData = require("../utilities/formatData");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var comicCollectionName = 'comics';
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var number, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).count();
        case 3:
          number = _context.sent;
          data.number = number + 1;
          _context.next = 7;
          return _comic.ComicModel.createNew(data);
        case 7:
          result = _context.sent;
          return _context.abrupt("return", result);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, data) {
    var updataData, tagID, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          updataData = {};
          if (data.title) {
            // data.title = titleCase(data.title)
            updataData = _objectSpread(_objectSpread({}, data), {}, {
              title2: (0, _formatData.formatViToEn)(data.title),
              updateAt: Date.now()
            });
          } else {
            if (data.tagID) {
              tagID = data.tagID.map(function (tag) {
                return (0, _mongodb.ObjectID)(tag);
              });
              updataData = _objectSpread(_objectSpread({}, data), {}, {
                tagID: tagID,
                updateAt: Date.now()
              });
            } else updataData = _objectSpread(_objectSpread({}, data), {}, {
              updateAt: Date.now()
            });
          }
          _context2.next = 5;
          return _comic.ComicModel.update(id, updataData);
        case 5:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function update(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getComic = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(page) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _comic.ComicModel.getComic(page);
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
  return function getComic(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getDetailComic = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _comic.ComicModel.getDetailComic(id);
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
  return function getDetailComic(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllComicOfTag = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(tagID, page) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _comic.ComicModel.getAllComicOfTag(tagID, page);
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
  return function getAllComicOfTag(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var getQuantityPage = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(tagID) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _comic.ComicModel.getQuantityPage(tagID);
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
  return function getQuantityPage(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
var getFollownLike = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _comic.ComicModel.getFollownLike(comicID);
        case 3:
          result = _context7.sent;
          return _context7.abrupt("return", result);
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          throw new Error(_context7.t0);
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function getFollownLike(_x9) {
    return _ref7.apply(this, arguments);
  };
}();
var getUnfinishedComics = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _comic.ComicModel.getUnfinishedComics();
        case 3:
          result = _context8.sent;
          return _context8.abrupt("return", result);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw new Error(_context8.t0);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getUnfinishedComics() {
    return _ref8.apply(this, arguments);
  };
}();
var getRemovedComics = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(page) {
    var result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _comic.ComicModel.getRemovedComics(page);
        case 3:
          result = _context9.sent;
          return _context9.abrupt("return", result);
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          throw new Error(_context9.t0);
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function getRemovedComics(_x10) {
    return _ref9.apply(this, arguments);
  };
}();
var softRemove = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(id) {
    var result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _comic.ComicModel.softRemove(id);
        case 3:
          result = _context10.sent;
          return _context10.abrupt("return", result);
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          throw new Error(_context10.t0);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function softRemove(_x11) {
    return _ref10.apply(this, arguments);
  };
}();
var remove = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(id) {
    var result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _comic.ComicModel.remove(id);
        case 3:
          result = _context11.sent;
          return _context11.abrupt("return", result);
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          throw new Error(_context11.t0);
        case 10:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function remove(_x12) {
    return _ref11.apply(this, arguments);
  };
}();
var removeAll = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _comic.ComicModel.removeAll();
        case 3:
          result = _context12.sent;
          return _context12.abrupt("return", result);
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          throw new Error(_context12.t0);
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function removeAll() {
    return _ref12.apply(this, arguments);
  };
}();
var search = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(key, page) {
    var result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _comic.ComicModel.search(key, page);
        case 3:
          result = _context13.sent;
          return _context13.abrupt("return", result);
        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          throw new Error(_context13.t0);
        case 10:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function search(_x13, _x14) {
    return _ref13.apply(this, arguments);
  };
}();
var ComicService = {
  createNew: createNew,
  update: update,
  getComic: getComic,
  getDetailComic: getDetailComic,
  getAllComicOfTag: getAllComicOfTag,
  getQuantityPage: getQuantityPage,
  getFollownLike: getFollownLike,
  getUnfinishedComics: getUnfinishedComics,
  getRemovedComics: getRemovedComics,
  remove: remove,
  removeAll: removeAll,
  search: search,
  softRemove: softRemove
};
exports.ComicService = ComicService;