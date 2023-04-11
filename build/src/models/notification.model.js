"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Define Tag collection
var notificationCollectionName = 'notifications';
var notificationCollectionSchema = _joi["default"].object({
  comicID: _joi["default"].string().required(),
  userID: _joi["default"].string().required(),
  chap: _joi["default"].number().required(),
  content: _joi["default"].string().required(),
  createAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updateAt: _joi["default"].date().timestamp()["default"](null),
  seen: _joi["default"]["boolean"]()["default"](false)
});
var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return notificationCollectionSchema.validateAsync(data, {
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
    var value, validatedData, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return validateSchema(data);
        case 3:
          value = _context2.sent;
          validatedData = _objectSpread(_objectSpread({}, value), {}, {
            comicID: (0, _mongodb.ObjectID)(value.comicID),
            userID: (0, _mongodb.ObjectID)(value.userID)
          });
          _context2.next = 7;
          return (0, _mongodb2.getDB)().collection(notificationCollectionName).insertOne(validatedData);
        case 7:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var updateStatus = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userID, data) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _mongodb2.getDB)().collection(notificationCollectionName).updateMany({
            userID: (0, _mongodb.ObjectID)(userID)
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
  return function updateStatus(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var remove = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(notificationCollectionName).deleteOne({
            _id: (0, _mongodb.ObjectID)(id)
          });
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
  return function remove(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var removeWithComic = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(comicID, chap) {
    var result, _result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(comicID && !chap)) {
            _context5.next = 6;
            break;
          }
          _context5.next = 4;
          return (0, _mongodb2.getDB)().collection(notificationCollectionName).deleteMany({
            comicID: (0, _mongodb.ObjectID)(comicID)
          });
        case 4:
          result = _context5.sent;
          return _context5.abrupt("return", result);
        case 6:
          if (!(comicID && chap)) {
            _context5.next = 11;
            break;
          }
          _context5.next = 9;
          return (0, _mongodb2.getDB)().collection(notificationCollectionName).deleteMany({
            comicID: (0, _mongodb.ObjectID)(comicID),
            chap: chap
          });
        case 9:
          _result = _context5.sent;
          return _context5.abrupt("return", _result);
        case 11:
          _context5.next = 16;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          throw new Error(_context5.t0);
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 13]]);
  }));
  return function removeWithComic(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var getNotifications = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userID, page) {
    var arr, yet, end, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _mongodb2.getDB)().collection(notificationCollectionName).aggregate([{
            $match: {
              userID: (0, _mongodb.ObjectID)(userID)
            }
          }, {
            $lookup: {
              from: 'comics',
              localField: 'comicID',
              foreignField: '_id',
              as: 'comic'
            }
          }, {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{
                  $arrayElemAt: ['$comic', 0]
                }, '$$ROOT']
              }
            }
          }, {
            $project: {
              comic: 0,
              title2: 0,
              updateAt: 0,
              tagID: 0,
              description: 0,
              author: 0,
              status: 0,
              views: 0,
              _destroy: 0
            }
          }]).sort({
            createAt: -1
          }).toArray();
        case 3:
          arr = _context6.sent;
          yet = arr.filter(function (item) {
            return item.seen !== true;
          });
          end = page * 12;
          result = arr.slice(0, end);
          return _context6.abrupt("return", {
            notifications: result,
            quantityPage: Math.ceil(arr.length / 12),
            yet: yet.length
          });
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function getNotifications(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
var NotificationModel = {
  createNew: createNew,
  updateStatus: updateStatus,
  remove: remove,
  getNotifications: getNotifications,
  removeWithComic: removeWithComic
};
exports.NotificationModel = NotificationModel;