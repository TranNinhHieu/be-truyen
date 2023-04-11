"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _enviroment = require("../config/enviroment");
var _jwt = require("../helpers/jwt.helper");
var _constants = require("../utilities/constants");
var isAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var tokenFromClient, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
          tokenFromClient = /*req.body.token || req.query.token ||*/req.headers['x-access-token'];
          if (!tokenFromClient) {
            _context.next = 15;
            break;
          }
          _context.prev = 2;
          _context.next = 5;
          return _jwt.jwtHelper.verifyToken(tokenFromClient, _enviroment.env.ACCESS_TOKEN_SECRET);
        case 5:
          decoded = _context.sent;
          // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
          req.jwtDecoded = decoded;
          // Cho phép req đi tiếp sang controller.
          next();
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(_constants.HttpStatusCode.UNAUTHORIZED).json({
            message: 'Unauthorized.'
          }));
        case 13:
          _context.next = 16;
          break;
        case 15:
          return _context.abrupt("return", res.status(403).send({
            message: 'No token provided.'
          }));
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 10]]);
  }));
  return function isAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var AuthMiddleware = {
  isAuth: isAuth
};
exports.AuthMiddleware = AuthMiddleware;