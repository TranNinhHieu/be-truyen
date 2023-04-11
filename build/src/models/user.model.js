"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _mongodb = require("mongodb");
var _mongodb2 = require("../config/mongodb");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Define user collection
var userCollectionName = 'users';
var userCollectionSchema = _joi["default"].object({
  name: _joi["default"].string().required().min(5).max(50).trim(),
  email: _joi["default"].string().required().min(15).max(50).trim(),
  password: _joi["default"].string().required().min(8),
  avatar: _joi["default"].string()["default"]('https://res.cloudinary.com/no-music-no-life/image/upload/v1637370860/avatar-user-higico_dfrmov.jpg'),
  isAdmin: _joi["default"]["boolean"]()["default"](false),
  like: _joi["default"].array().items(_joi["default"].string())["default"]([]),
  follow: _joi["default"].array().items(_joi["default"].string())["default"]([]),
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
          return userCollectionSchema.validateAsync(data, {
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
    var value, valueValidated;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return validateSchema(data);
        case 3:
          value = _context2.sent;
          valueValidated = _objectSpread(_objectSpread({}, value), {}, {
            createAt: Date.now()
          });
          _context2.next = 7;
          return (0, _mongodb2.getDB)().collection(userCollectionName).insertOne(valueValidated);
        case 7:
          return _context2.abrupt("return", valueValidated);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
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
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOneAndUpdate({
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
var login = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var user, isMatch, userInfo;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            email: data.email,
            _destroy: false
          });
        case 3:
          user = _context4.sent;
          if (user) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", null);
        case 6:
          _context4.next = 8;
          return _bcrypt["default"].compare(data.password, user.password);
        case 8:
          isMatch = _context4.sent;
          if (isMatch) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", undefined);
        case 13:
          userInfo = {
            _id: user._id,
            isAdmin: user.isAdmin
          };
          return _context4.abrupt("return", userInfo);
        case 15:
          _context4.next = 20;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function login(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getFullUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var userData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            _id: (0, _mongodb.ObjectID)(id),
            _destroy: false
          }, {
            projection: {
              name: 1,
              email: 1,
              avatar: 1,
              isAdmin: 1
            }
          });
        case 3:
          userData = _context5.sent;
          return _context5.abrupt("return", userData);
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
  return function getFullUser(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var likeStatus = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userID, comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            _id: (0, _mongodb.ObjectID)(userID),
            like: (0, _mongodb.ObjectID)(comicID),
            _destroy: false
          });
        case 3:
          result = _context6.sent;
          if (!result) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", true);
        case 8:
          return _context6.abrupt("return", false);
        case 9:
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function likeStatus(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
var followStatus = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userID, comicID) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            _id: (0, _mongodb.ObjectID)(userID),
            follow: (0, _mongodb.ObjectID)(comicID),
            _destroy: false
          });
        case 3:
          result = _context7.sent;
          if (!result) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", true);
        case 8:
          return _context7.abrupt("return", false);
        case 9:
          _context7.next = 14;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          throw new Error(_context7.t0);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function followStatus(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
var updateLikeComic = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(userID, comicID) {
    var result, checkExist;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          result = null;
          _context8.next = 4;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            _id: (0, _mongodb.ObjectID)(userID),
            like: (0, _mongodb.ObjectID)(comicID),
            _destroy: false
          });
        case 4:
          checkExist = _context8.sent;
          if (!checkExist) {
            _context8.next = 11;
            break;
          }
          _context8.next = 8;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(userID),
            _destroy: false
          }, {
            $pull: {
              like: (0, _mongodb.ObjectID)(comicID)
            }
          }, {
            returnOriginal: false
          });
        case 8:
          result = _context8.sent;
          _context8.next = 14;
          break;
        case 11:
          _context8.next = 13;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(userID),
            _destroy: false
          }, {
            $push: {
              like: (0, _mongodb.ObjectID)(comicID)
            }
          }, {
            returnOriginal: false
          });
        case 13:
          result = _context8.sent;
        case 14:
          return _context8.abrupt("return", result);
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](0);
          throw new Error(_context8.t0);
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 17]]);
  }));
  return function updateLikeComic(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();
var updateFollowComic = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(userID, comicID) {
    var result, checkExist;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          result = null;
          _context9.next = 4;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOne({
            _id: (0, _mongodb.ObjectID)(userID),
            follow: (0, _mongodb.ObjectID)(comicID),
            _destroy: false
          });
        case 4:
          checkExist = _context9.sent;
          if (!checkExist) {
            _context9.next = 11;
            break;
          }
          _context9.next = 8;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(userID),
            _destroy: false
          }, {
            $pull: {
              follow: (0, _mongodb.ObjectID)(comicID)
            }
          }, {
            returnOriginal: false
          });
        case 8:
          result = _context9.sent;
          _context9.next = 14;
          break;
        case 11:
          _context9.next = 13;
          return (0, _mongodb2.getDB)().collection(userCollectionName).findOneAndUpdate({
            _id: (0, _mongodb.ObjectID)(userID),
            _destroy: false
          }, {
            $push: {
              follow: (0, _mongodb.ObjectID)(comicID)
            }
          }, {
            returnOriginal: false
          });
        case 13:
          result = _context9.sent;
        case 14:
          return _context9.abrupt("return", result);
        case 17:
          _context9.prev = 17;
          _context9.t0 = _context9["catch"](0);
          throw new Error(_context9.t0);
        case 20:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 17]]);
  }));
  return function updateFollowComic(_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();
var getLikedComics = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(userID, page) {
    var userData, begin, end, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(userID),
              _destroy: false
            }
          }, {
            $unwind: {
              path: '$like'
            }
          }, {
            $project: {
              _id: 0,
              like: 1
            }
          }, {
            $lookup: {
              from: 'comics',
              "let": {
                liked: '$like'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $and: [{
                      $eq: ['$_id', '$$liked']
                    }, {
                      $eq: ['$_destroy', false]
                    }]
                  }
                }
              }, {
                $project: {
                  _id: 1,
                  number: 1,
                  title: 1,
                  thumbnail: 1,
                  createAt: 1
                }
              }],
              as: 'liked'
            }
          }, {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{
                  $arrayElemAt: ['$liked', 0]
                }, '$$ROOT']
              }
            }
          }, {
            $project: {
              liked: 0,
              like: 0
            }
          }]).toArray();
        case 3:
          userData = _context10.sent;
          begin = (page - 1) * 12;
          end = page * 12;
          result = userData.reverse().slice(begin, end);
          return _context10.abrupt("return", result);
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          throw new Error(_context10.t0);
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getLikedComics(_x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();
var getFollowedComics = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(userID, page) {
    var userData, begin, end, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(userID),
              _destroy: false
            }
          }, {
            $unwind: {
              path: '$follow'
            }
          }, {
            $project: {
              _id: 0,
              follow: 1
            }
          }, {
            $lookup: {
              from: 'comics',
              "let": {
                followed: '$follow'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $and: [{
                      $eq: ['$_id', '$$followed']
                    }, {
                      $eq: ['$_destroy', false]
                    }]
                  }
                }
              }, {
                $project: {
                  _id: 1,
                  number: 1,
                  title: 1,
                  thumbnail: 1,
                  createAt: 1
                }
              }],
              as: 'followed'
            }
          }, {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{
                  $arrayElemAt: ['$followed', 0]
                }, '$$ROOT']
              }
            }
          }, {
            $project: {
              followed: 0,
              follow: 0
            }
          }]).toArray();
        case 3:
          userData = _context11.sent;
          begin = (page - 1) * 12;
          end = page * 12;
          result = userData.reverse().slice(begin, end);
          return _context11.abrupt("return", result);
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          throw new Error(_context11.t0);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function getFollowedComics(_x17, _x18) {
    return _ref11.apply(this, arguments);
  };
}();
var getQuantityPageLikedComics = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(userID) {
    var quantity, result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          quantity = 0;
          _context12.next = 4;
          return (0, _mongodb2.getDB)().collection(userCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(userID),
              _destroy: false
            }
          }, {
            $unwind: {
              path: '$like'
            }
          }, {
            $project: {
              _id: 0,
              like: 1
            }
          }, {
            $lookup: {
              from: 'comics',
              "let": {
                liked: '$like'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $and: [{
                      $eq: ['$_id', '$$liked']
                    }, {
                      $eq: ['$_destroy', false]
                    }]
                  }
                }
              }, {
                $project: {
                  _id: 1,
                  number: 1,
                  title: 1,
                  thumbnail: 1,
                  createAt: 1
                }
              }],
              as: 'liked'
            }
          }, {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{
                  $arrayElemAt: ['$liked', 0]
                }, '$$ROOT']
              }
            }
          }, {
            $project: {
              liked: 0,
              like: 0
            }
          }]).toArray();
        case 4:
          result = _context12.sent;
          quantity = Math.ceil(result.length / 12);
          return _context12.abrupt("return", quantity);
        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          throw new Error(_context12.t0);
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 9]]);
  }));
  return function getQuantityPageLikedComics(_x19) {
    return _ref12.apply(this, arguments);
  };
}();
var getQuantityPageFollowedComics = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(userID) {
    var quantity, result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          quantity = 0;
          _context13.next = 4;
          return (0, _mongodb2.getDB)().collection(userCollectionName).aggregate([{
            $match: {
              _id: (0, _mongodb.ObjectID)(userID),
              _destroy: false
            }
          }, {
            $unwind: {
              path: '$follow'
            }
          }, {
            $project: {
              _id: 0,
              follow: 1
            }
          }, {
            $lookup: {
              from: 'comics',
              "let": {
                followed: '$follow'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $and: [{
                      $eq: ['$_id', '$$followed']
                    }, {
                      $eq: ['$_destroy', false]
                    }]
                  }
                }
              }, {
                $project: {
                  _id: 1,
                  number: 1,
                  title: 1,
                  thumbnail: 1,
                  createAt: 1
                }
              }],
              as: 'followed'
            }
          }, {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{
                  $arrayElemAt: ['$followed', 0]
                }, '$$ROOT']
              }
            }
          }, {
            $project: {
              followed: 0,
              follow: 0
            }
          }]).toArray();
        case 4:
          result = _context13.sent;
          quantity = Math.ceil(result.length / 12);
          return _context13.abrupt("return", quantity);
        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](0);
          throw new Error(_context13.t0);
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 9]]);
  }));
  return function getQuantityPageFollowedComics(_x20) {
    return _ref13.apply(this, arguments);
  };
}();
var getAllUsers = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var result;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return (0, _mongodb2.getDB)().collection(userCollectionName).find({
            isAdmin: false,
            _destroy: false
          }, {
            projection: {
              name: 1,
              email: 1,
              createAt: 1,
              updateAt: 1
            }
          }).toArray();
        case 3:
          result = _context14.sent;
          return _context14.abrupt("return", result);
        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          throw new Error(_context14.t0);
        case 10:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 7]]);
  }));
  return function getAllUsers() {
    return _ref14.apply(this, arguments);
  };
}();
var UserModel = {
  login: login,
  getFullUser: getFullUser,
  createNew: createNew,
  update: update,
  likeStatus: likeStatus,
  followStatus: followStatus,
  updateLikeComic: updateLikeComic,
  updateFollowComic: updateFollowComic,
  getLikedComics: getLikedComics,
  getFollowedComics: getFollowedComics,
  getQuantityPageFollowedComics: getQuantityPageFollowedComics,
  getQuantityPageLikedComics: getQuantityPageLikedComics,
  getAllUsers: getAllUsers
};
exports.UserModel = UserModel;