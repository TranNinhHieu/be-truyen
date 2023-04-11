"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComicController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _comic = require("../services/comic.service");
var _constants = require("../utilities/constants");
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _comic.ComicService.createNew(req.body);
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
  return function createNew(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return _comic.ComicService.update(id, req.body);
        case 4:
          result = _context2.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context2.t0.message
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function update(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getComic = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var page, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          page = req.query.page;
          _context3.next = 4;
          return _comic.ComicService.getComic(page);
        case 4:
          result = _context3.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
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
  return function getComic(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getDetailComic = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _comic.ComicService.getDetailComic(id);
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
  return function getDetailComic(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllComicOfTag = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var tagID, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          tagID = req.query.tagID;
          _context5.next = 4;
          return _comic.ComicService.getAllComicOfTag(tagID);
        case 4:
          result = _context5.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context5.t0.message
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getAllComicOfTag(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getQuantityPage = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var tagID, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          tagID = req.query.tagID;
          _context6.next = 4;
          return _comic.ComicService.getQuantityPage(tagID);
        case 4:
          result = _context6.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context6.t0.message
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getQuantityPage(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getFollownLike = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return _comic.ComicService.getFollownLike(id);
        case 4:
          result = _context7.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context7.t0.message
          });
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function getFollownLike(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getUnfinishedComics = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _comic.ComicService.getUnfinishedComics();
        case 3:
          result = _context8.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getUnfinishedComics(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getRemovedComics = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var page, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          page = req.params.page;
          _context9.next = 4;
          return _comic.ComicService.getRemovedComics(page);
        case 4:
          result = _context9.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context9.t0.message
          });
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function getRemovedComics(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var softRemove = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.id;
          _context10.next = 4;
          return _comic.ComicService.softRemove(id);
        case 4:
          result = _context10.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context10.next = 11;
          break;
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context10.t0.message
          });
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function softRemove(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var remove = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          id = req.params.id;
          _context11.next = 4;
          return _comic.ComicService.remove(id);
        case 4:
          result = _context11.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context11.next = 11;
          break;
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context11.t0.message
          });
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return function remove(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var removeAll = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _comic.ComicService.removeAll();
        case 3:
          result = _context12.sent;
          res.status(_constants.HttpStatusCode.OK).json(result);
          _context12.next = 10;
          break;
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context12.t0.message
          });
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function removeAll(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var search = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var _req$query, key, page, result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _req$query = req.query, key = _req$query.key, page = _req$query.page;
          _context13.next = 4;
          return _comic.ComicService.search(key, page);
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
  return function search(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var ComicController = {
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
exports.ComicController = ComicController;