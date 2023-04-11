"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChapterModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var _notification = require("./notification.model");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Define Chapter collection
var chapterCollectionName = 'chapters';
var chapterCollectionSchema = _joi["default"].object({
  comicID: _joi["default"].string().required(),
  chap: _joi["default"].number().required(),
  image: _joi["default"].array().items(_joi["default"].string()).required(),
  createAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updateAt: _joi["default"].date().timestamp()["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});
var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return chapterCollectionSchema.validateAsync(data, {
            abortEarly: false
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createNew = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var value, valueValidated, userArr, comic, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return validateSchema(data);
        case 3:
          value = _context3.sent;
          valueValidated = _objectSpread(_objectSpread({}, value), {}, {
            createAt: Date.now()
          });
          _context3.next = 7;
          return (0, _mongodb2.getDB)().collection('users').find({
            follow: (0, _mongodb.ObjectID)(valueValidated.comicID),
            _destroy: false
          }).toArray();
        case 7:
          userArr = _context3.sent;
          _context3.next = 10;
          return (0, _mongodb2.getDB)().collection('comics').findOne({
            _id: (0, _mongodb.ObjectID)(valueValidated.comicID),
            _destroy: false
          });
        case 10:
          comic = _context3.sent;
          userArr.map( /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user) {
              var notification;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    notification = {
                      comicID: valueValidated.comicID,
                      userID: user._id.toString(),
                      chap: valueValidated.chap,
                      content: "<b>".concat(comic.title, "</b> \u0111\xE3 th\xEAm ch\u01B0\u01A1ng m\u1EDBi.")
                    };
                    _context2.next = 3;
                    return _notification.NotificationModel.createNew(notification);
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref3.apply(this, arguments);
            };
          }());
          _context3.next = 14;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).insertOne(valueValidated);
        case 14:
          result = _context3.sent;
          return _context3.abrupt("return", result);
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var result, chapter;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(id)
          }, {
            $set: data
          }, {
            returnOriginal: false
          });
        case 3:
          result = _context4.sent;
          if (!(data._destroy === true)) {
            _context4.next = 10;
            break;
          }
          _context4.next = 7;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).findOne({
            _id: (0, _mongodb.ObjectID)(id),
            _destroy: true
          });
        case 7:
          chapter = _context4.sent;
          _context4.next = 10;
          return _notification.NotificationModel.removeWithComic(chapter.comicID, chapter.chap);
        case 10:
          return _context4.abrupt("return", result);
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function update(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllChapterOfComic = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).find({
            comicID: comicID,
            _destroy: false
          }, {
            projection: {
              comicID: 1,
              chap: 1,
              createAt: 1,
              updateAt: 1
            }
          }).sort({
            chap: 1
          }).toArray();
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
  return function getAllChapterOfComic(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var getFullChapter = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(comicID, chap) {
    var _yield$Promise$all, _yield$Promise$all2, chapter, comic, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.t0 = Promise;
          _context6.next = 4;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).findOne({
            comicID: comicID,
            chap: parseInt(chap),
            _destroy: false
          }, {
            projection: {
              chap: 1,
              image: 1
            }
          });
        case 4:
          _context6.t1 = _context6.sent;
          _context6.next = 7;
          return (0, _mongodb2.getDB)().collection('comics').findOne({
            _id: (0, _mongodb.ObjectID)(comicID),
            _destroy: false
          }, {
            projection: {
              _id: 0,
              number: 1,
              title: 1
            }
          });
        case 7:
          _context6.t2 = _context6.sent;
          _context6.t3 = [_context6.t1, _context6.t2];
          _context6.next = 11;
          return _context6.t0.all.call(_context6.t0, _context6.t3);
        case 11:
          _yield$Promise$all = _context6.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
          chapter = _yield$Promise$all2[0];
          comic = _yield$Promise$all2[1];
          result = _objectSpread(_objectSpread({}, chapter), comic);
          return _context6.abrupt("return", result);
        case 19:
          _context6.prev = 19;
          _context6.t4 = _context6["catch"](0);
          throw new Error(_context6.t4);
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 19]]);
  }));
  return function getFullChapter(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
var getQuantityChapter = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).find({
            comicID: comicID,
            _destroy: false
          }).count();
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
  return function getQuantityChapter(_x9) {
    return _ref7.apply(this, arguments);
  };
}();
var getNewComics = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).aggregate([{
            $match: {
              _destroy: false
            }
          }, {
            $lookup: {
              from: 'comics',
              "let": {
                comic: {
                  $toObjectId: '$comicID'
                },
                destroy: '$_destroy'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$comic']
                  },
                  _destroy: false
                }
              }, {
                $project: {
                  _id: 0,
                  number: 1,
                  title: 1,
                  author: 1,
                  thumbnail: 1
                }
              }],
              as: 'comicInfo'
            }
          }, {
            $unwind: {
              path: '$comicInfo',
              preserveNullAndEmptyArrays: true
            }
          }, {
            $project: {
              comicID: 1,
              chap: 1,
              createAt: 1,
              comicInfo: 1
            }
          }, {
            $sort: {
              createAt: -1,
              chap: -1
            }
          }, {
            $limit: 10
          }]).toArray();
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
  return function getNewComics() {
    return _ref8.apply(this, arguments);
  };
}();
var updateMany = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return (0, _mongodb2.getDB)().collection(chapterCollectionName).updateMany({
            comicID: comicID
          }, {
            $set: {
              'updateAt': Date.now(),
              '_destroy': true
            }
          }, {
            returnOriginal: false
          });
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
  return function updateMany(_x10) {
    return _ref9.apply(this, arguments);
  };
}();
var ChapterModel = {
  createNew: createNew,
  update: update,
  getAllChapterOfComic: getAllChapterOfComic,
  getFullChapter: getFullChapter,
  getQuantityChapter: getQuantityChapter,
  getNewComics: getNewComics,
  updateMany: updateMany
};
exports.ChapterModel = ChapterModel;