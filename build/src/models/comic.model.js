"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComicModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
var _formatData = require("../utilities/formatData");
var _chapter = require("./chapter.model");
var _notification = require("./notification.model");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Define Comic collection
var comicCollectionName = 'comics';
var comicCollectionSchema = _joi["default"].object({
  number: _joi["default"].number()["default"](0),
  title: _joi["default"].string().required().min(3).max(100).trim(),
  title2: _joi["default"].string()["default"]('').trim(),
  description: _joi["default"].string()["default"]('Đang cập nhật'),
  tagID: _joi["default"].array().items(_joi["default"].string()).required(),
  thumbnail: _joi["default"].string().required(),
  author: _joi["default"].string()["default"]('Đang cập nhật'),
  status: _joi["default"].string()["default"]('Chưa hoàn thành'),
  views: _joi["default"].number()["default"](0),
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
          return comicCollectionSchema.validateAsync(data, {
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var value, title, title2, tagID, valueValidated, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return validateSchema(data);
        case 3:
          value = _context2.sent;
          title = (0, _formatData.titleCase)(value.title);
          title2 = (0, _formatData.formatViToEn)(value.title);
          tagID = value.tagID.map(function (tag) {
            return (0, _mongodb.ObjectID)(tag);
          });
          valueValidated = _objectSpread(_objectSpread({}, value), {}, {
            title: title,
            title2: title2,
            tagID: tagID,
            createAt: Date.now()
          });
          _context2.next = 10;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).insertOne(valueValidated);
        case 10:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(id)
          }, {
            $set: data
          }, {
            returnOriginal: false
          });
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
  return function update(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getComic = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(page) {
    var listComic, begin, end, result, comics, number;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            _destroy: false
          }).project({
            number: 1,
            title: 1,
            thumbnail: 1,
            createAt: 1
          }).sort({
            createAt: -1
          }).toArray();
        case 3:
          listComic = _context4.sent;
          begin = (page - 1) * 12;
          end = page * 12;
          result = listComic.slice(begin, end);
          if (!(Number(page) === 0)) {
            _context4.next = 12;
            break;
          }
          _context4.next = 10;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            _destroy: false
          }).toArray();
        case 10:
          comics = _context4.sent;
          result = comics;
        case 12:
          _context4.next = 14;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).count();
        case 14:
          number = _context4.sent;
          return _context4.abrupt("return", {
            comics: result,
            quantityComic: number
          });
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function getComic(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getDetailComic = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var comic;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(id),
              _destroy: false
            }
          }, {
            $project: {
              updateAt: 0,
              _destroy: 0
            }
          }, {
            $lookup: {
              from: 'tags',
              localField: 'tagID',
              foreignField: '_id',
              as: 'tags'
            }
          }, {
            $project: {
              tagID: 0
            }
          }]).toArray();
        case 3:
          comic = _context5.sent;
          return _context5.abrupt("return", comic[0]);
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
  return function getDetailComic(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllComicOfTag = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(tagID) {
    var listComic, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            tagID: (0, _mongodb.ObjectID)(tagID),
            _destroy: false
          }, {
            projection: {
              number: 1,
              title: 1,
              thumbnail: 1,
              createAt: 1
            }
          }).sort({
            createAt: -1
          }).toArray();
        case 3:
          listComic = _context6.sent;
          // const begin = (page-1)*12
          // const end = page*12
          // .slice(begin, end)
          result = listComic;
          return _context6.abrupt("return", result);
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getAllComicOfTag(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
var getQuantityPage = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(tagID) {
    var quantity, listComic, _listComic, _listComic2;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          quantity = 0;
          if (!(tagID === undefined)) {
            _context7.next = 9;
            break;
          }
          _context7.next = 5;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            _destroy: false
          }).count();
        case 5:
          listComic = _context7.sent;
          quantity = Math.ceil(listComic / 12);
          _context7.next = 20;
          break;
        case 9:
          if (!(tagID == 0)) {
            _context7.next = 16;
            break;
          }
          _context7.next = 12;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            tagID: (0, _mongodb.ObjectID)('616af71268f59ad44354b30f'),
            _destroy: false
          }).count();
        case 12:
          _listComic = _context7.sent;
          quantity = Math.ceil(_listComic / 12);
          _context7.next = 20;
          break;
        case 16:
          _context7.next = 18;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            tagID: (0, _mongodb.ObjectID)(tagID),
            _destroy: false
          }).count();
        case 18:
          _listComic2 = _context7.sent;
          quantity = Math.ceil(_listComic2 / 12);
        case 20:
          return _context7.abrupt("return", quantity);
        case 23:
          _context7.prev = 23;
          _context7.t0 = _context7["catch"](0);
          throw new Error(_context7.t0);
        case 26:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 23]]);
  }));
  return function getQuantityPage(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
var getFollownLike = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(comicID) {
    var follow, like, comment;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(comicID),
              _destroy: false
            }
          }, {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'follow',
              as: 'quantity'
            }
          }, {
            $unwind: '$quantity'
          }]).toArray();
        case 3:
          follow = _context8.sent;
          _context8.next = 6;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(comicID),
              _destroy: false
            }
          }, {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'like',
              as: 'quantity'
            }
          }, {
            $unwind: '$quantity'
          }]).toArray();
        case 6:
          like = _context8.sent;
          _context8.next = 9;
          return (0, _mongodb2.getDB)().collection('comments').find({
            comicID: (0, _mongodb.ObjectID)(comicID)
          }).count();
        case 9:
          comment = _context8.sent;
          return _context8.abrupt("return", {
            likes: like.length,
            follows: follow.length,
            comments: comment
          });
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          throw new Error(_context8.t0);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 13]]);
  }));
  return function getFollownLike(_x9) {
    return _ref8.apply(this, arguments);
  };
}();
var getUnfinishedComics = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          result = (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            status: 'Chưa hoàn thành',
            _destroy: false
          }, {
            projection: {
              number: 1,
              title: 1,
              thumbnail: 1,
              createAt: 1
            }
          }).sort({
            createAt: -1
          }).toArray();
          return _context9.abrupt("return", result);
        case 5:
          _context9.prev = 5;
          _context9.t0 = _context9["catch"](0);
          throw new Error(_context9.t0);
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 5]]);
  }));
  return function getUnfinishedComics() {
    return _ref9.apply(this, arguments);
  };
}();
var getRemovedComics = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(page) {
    var comics, begin, end, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          comics = (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            _destroy: true
          }, {
            projection: {
              number: 1,
              title: 1,
              thumbnail: 1
            }
          }).sort({
            updateAt: -1
          }).toArray();
          begin = (page - 1) * 24;
          end = page * 24;
          result = comics.slice(begin, end);
          return _context10.abrupt("return", {
            comics: result,
            quatitypage: Math.ceil(comics.length / 12)
          });
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          throw new Error(_context10.t0);
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function getRemovedComics(_x10) {
    return _ref10.apply(this, arguments);
  };
}();
var softRemove = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(id) {
    var comic, chapters;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(id)
          }, {
            $set: {
              'updateAt': Date.now(),
              '_destroy': true
            }
          }, {
            returnOriginal: false
          });
        case 3:
          comic = _context11.sent;
          _context11.next = 6;
          return _chapter.ChapterModel.updateMany(id);
        case 6:
          chapters = _context11.sent;
          _context11.next = 9;
          return _notification.NotificationModel.removeWithComic(id, null);
        case 9:
          return _context11.abrupt("return", {
            comic: comic,
            chapters: chapters
          });
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](0);
          throw new Error(_context11.t0);
        case 15:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 12]]);
  }));
  return function softRemove(_x11) {
    return _ref11.apply(this, arguments);
  };
}();
var remove = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(id) {
    var comic, chapter;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).deleteOne({
            _id: (0, _mongodb.ObjectID)(id),
            _destroy: true
          });
        case 3:
          comic = _context12.sent;
          _context12.next = 6;
          return (0, _mongodb2.getDB)().collection('chapters').deleteMany({
            comicID: id
          });
        case 6:
          chapter = _context12.sent;
          return _context12.abrupt("return", {
            comic: comic,
            chapter: chapter
          });
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          throw new Error();
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function remove(_x12) {
    return _ref12.apply(this, arguments);
  };
}();
var removeAll = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).deleteMany({
            _destroy: true
          });
        case 3:
          result = _context13.sent;
          return _context13.abrupt("return", result);
        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          throw new Error();
        case 10:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function removeAll() {
    return _ref13.apply(this, arguments);
  };
}();
var search = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(key, page) {
    var comics, end, result;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          if (!(key === '')) {
            _context14.next = 3;
            break;
          }
          return _context14.abrupt("return", {
            comics: [],
            quantityPage: 0
          });
        case 3:
          key = key.trim();
          _context14.next = 6;
          return (0, _mongodb2.getDB)().collection(comicCollectionName).find({
            title2: new RegExp(key, 'i'),
            _destroy: false
          }, {
            projection: {
              number: 1,
              title: 1,
              thumbnail: 1,
              createAt: 1
            }
          }).sort({
            createAt: -1
          }).toArray();
        case 6:
          comics = _context14.sent;
          end = page * 12;
          result = comics.slice(0, end);
          if (Number(page) === 0) {
            result = comics;
          }
          return _context14.abrupt("return", {
            comics: result,
            quantityPage: Math.ceil(comics.length / 12)
          });
        case 13:
          _context14.prev = 13;
          _context14.t0 = _context14["catch"](0);
          throw new Error(_context14.t0);
        case 16:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 13]]);
  }));
  return function search(_x13, _x14) {
    return _ref14.apply(this, arguments);
  };
}();
var ComicModel = {
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
exports.ComicModel = ComicModel;