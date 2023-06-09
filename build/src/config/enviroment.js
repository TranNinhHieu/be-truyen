"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;
require('dotenv').config();
var env = {
  MONGODB_URI: process.env.MONGODB_URI,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  ACTIVE_TOKEN_SECRET: process.env.ACTIVE_TOKEN_SECRET,
  ACTIVE_TOKEN_LIFE: process.env.ACTIVE_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
  MAILING_SERVICE_REFRESH_TOKEN: process.env.MAILING_SERVICE_REFRESH_TOKEN
};
exports.env = env;