"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITELIST_DOMAINS = exports.HttpStatusCode = void 0;
var HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
};
exports.HttpStatusCode = HttpStatusCode;
var WHITELIST_DOMAINS = ['http://localhost:8080', 'http://localhost:3000', 'https://comic-riverdev-web.web.app', 'https://comic-riverdev-web.firebaseapp.com', 'https://comic-riverdev-api.herokuapp.com'];
exports.WHITELIST_DOMAINS = WHITELIST_DOMAINS;