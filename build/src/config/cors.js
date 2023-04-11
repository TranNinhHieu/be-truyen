"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptionsDelegate = void 0;
var _constants = require("../utilities/constants");
var corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
  var corsOptions;
  if (_constants.WHITELIST_DOMAINS.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    };
  } else {
    corsOptions = {
      origin: false
    };
  }
  callback(null, corsOptions);
};
exports.corsOptionsDelegate = corsOptionsDelegate;