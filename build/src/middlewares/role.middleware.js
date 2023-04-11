"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _constants = require("../utilities/constants");
var isAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _isAdmin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _isAdmin = req.jwtDecoded.data.isAdmin;
          if (!_isAdmin) {
            _context.next = 6;
            break;
          }
          next();
          _context.next = 7;
          break;
        case 6:
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.BAD_REQUEST).json({
            message: 'Admin role!'
          }));
        case 7:
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(_constants.HttpStatusCode.INTERNAL_SERVER).json({
            errors: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var RoleMiddleware = {
  isAdmin: isAdmin
};
exports.RoleMiddleware = RoleMiddleware;