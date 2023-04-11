"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Define comment collection
var commentCollectionName = 'comments';
var commentCollectionSchema = _joi["default"].object({
  comicID: _joi["default"].string().required(),
  userID: _joi["default"].string().required(),
  content: _joi["default"].string().required().min(1),
  createAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updateAt: _joi["default"].date().timestamp()["default"](Date.now())
});
var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return commentCollectionSchema.validateAsync(data, {
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
var postComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var validatedValue, insertValue, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return validateSchema(data);
        case 3:
          validatedValue = _context2.sent;
          insertValue = _objectSpread(_objectSpread({}, validatedValue), {}, {
            comicID: (0, _mongodb.ObjectID)(validatedValue.comicID),
            userID: (0, _mongodb.ObjectID)(validatedValue.userID),
            createAt: Date.now(),
            updateAt: Date.now()
          });
          _context2.next = 7;
          return (0, _mongodb2.getDB)().collection(commentCollectionName).insertOne(insertValue);
        case 7:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          throw new Error();
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function postComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var updateComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _mongodb2.getDB)().collection(commentCollectionName).findOneAndUpdate({
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
          throw new Error();
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function updateComment(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var removeComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(commentCollectionName).deleteOne({
            _id: (0, _mongodb.ObjectID)(id)
          });
        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw new Error();
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function removeComment(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getComments = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(comicID, page) {
    var listComment, end, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _mongodb2.getDB)().collection(commentCollectionName).aggregate([{
            $match: {
              comicID: (0, _mongodb.ObjectID)(comicID)
            }
          }, {
            $lookup: {
              from: 'users',
              localField: 'userID',
              foreignField: '_id',
              as: 'user'
            }
          }, {
            $unwind: '$user'
          }, {
            $project: {
              userID: 1,
              content: 1,
              'user.name': 1,
              'user.avatar': 1,
              createAt: 1
            }
          }, {
            $sort: {
              createAt: -1
            }
          }]).toArray();
        case 3:
          listComment = _context5.sent;
          // const begin = (page - 1)*12
          end = page * 12;
          result = listComment.slice(0, end);
          return _context5.abrupt("return", result);
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          throw new Error();
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function getComments(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var CommentModel = {
  postComment: postComment,
  updateComment: updateComment,
  removeComment: removeComment,
  getComments: getComments
};
exports.CommentModel = CommentModel;