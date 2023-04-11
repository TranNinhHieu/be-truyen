"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailHelper = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _enviroment = require("../config/enviroment");
var _googleapis = require("googleapis");
var OAuth2 = _googleapis.google.auth.OAuth2;
var REDIRECT_URL = 'https://developers.google.com/oauthplayground';
var OAuth2Client = new OAuth2(_enviroment.env.GOOGLE_CLIENT_ID, _enviroment.env.GOOGLE_CLIENT_SECRET, REDIRECT_URL);
OAuth2Client.setCredentials({
  refresh_token: _enviroment.env.MAILING_SERVICE_REFRESH_TOKEN
});
var sendMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(toEmail, url, text) {
    var accessToken, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return OAuth2Client.getAccessToken();
        case 3:
          accessToken = _context.sent;
          transporter = _nodemailer["default"].createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: _enviroment.env.SENDER_EMAIL_ADDRESS,
              clientId: _enviroment.env.GOOGLE_CLIENT_ID,
              clientSecret: _enviroment.env.GOOGLE_CLIENT_SECRET,
              refreshToken: _enviroment.env.MAILING_SERVICE_REFRESH_TOKEN,
              accessToken: accessToken
            }
          });
          mailOptions = {};
          if (url) mailOptions = {
            from: "HiGiCo Comic <".concat(_enviroment.env.SENDER_EMAIL_ADDRESS, ">"),
            to: toEmail,
            subject: 'Xác nhận tài khoản',
            html: "\n            <form method=\"POST\" action=".concat(url, " style=\"max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;text-align:center;\">\n            <h2 style=\"text-align: center; text-transform: uppercase;color: #fecf4b;\">Ch\xE0o m\u1EEBng b\u1EA1n \u0111\u1EBFn v\u1EDBi HiGiCo Comic!</h2>\n            <p>\n                B\u1EA1n vui l\xF2ng click v\xE0o n\xFAt b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\xE1c nh\u1EADn t\xE0i kho\u1EA3n.\n            </p>\n            <input type=\"text\" name=\"verify\" style=\"display: none\" readOnly value=\"").concat(text, "\"></input>\n            <input type=\"submit\" value=\"X\xE1c minh\" style=\"background: #fa62ff; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;border-radius:0.5rem;font-weight: bold;box-shadow:0 3px 6px #fa62ff;text-transform: uppercase;cursor: pointer; outline: none;border: none\"></input>\n        \n          </form>")
          };else mailOptions = {
            from: "HiGiCo Comic <".concat(_enviroment.env.SENDER_EMAIL_ADDRESS, ">"),
            to: toEmail,
            subject: 'Mật khẩu mới',
            html: "\n            <div style=\"max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;text-align:center;\">\n            <h2 style=\"text-align: center; text-transform: uppercase;color: #fecf4b;\">Ch\xE0o m\u1EEBng b\u1EA1n \u0111\u1EBFn v\u1EDBi HiGiCo Comic!</h2>\n            <p>\n                M\u1EADt kh\u1EA9u m\u1EDBi c\u1EE7a b\u1EA1n l\xE0: ".concat(text, "\n            </p>\n        \n            </div>")
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log('Error: ', err);else return info;
            transporter.close();
          });
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log('Phát tốt bụng  ', _context.t0);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function sendMail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var mailHelper = {
  sendMail: sendMail
};
exports.mailHelper = mailHelper;