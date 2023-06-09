"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDB = exports.connectDB = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongodb = require("mongodb");
var _enviroment = require("./enviroment");
var dbInstance = null;
var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          client = new _mongodb.MongoClient(_enviroment.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
          }); // Connect the client to server
          _context.next = 3;
          return client.connect();
        case 3:
          // Assign clientDB to our dbInstance
          dbInstance = client.db(_enviroment.env.DATABASE_NAME);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}();

// Get Database Instance
exports.connectDB = connectDB;
var getDB = function getDB() {
  if (!dbInstance) throw new Error('Must connect to Database first!');
  return dbInstance;
};

// const listDatabases = async (client) => {
//     const databasesList = await client.db().admin().listDatabases()
//     console.log(databasesList)
//     console.log('Your databases:')
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`))
// }
exports.getDB = getDB;