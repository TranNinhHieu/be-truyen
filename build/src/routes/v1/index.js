"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiV1 = void 0;
var _express = _interopRequireDefault(require("express"));
var _constants = require("../../utilities/constants");
var _chapter = require("./chapter.route");
var _comic = require("./comic.route");
var _notification = require("./notification.route");
var _tag = require("./tag.route");
var _user = require("./user.route");
var router = _express["default"].Router();

/**
 * GET v1/status
 */
router.get('/status', function (req, res) {
  return res.status(_constants.HttpStatusCode.OK).json({
    status: 'OK!'
  });
});

/* Comics APIs*/
router.use('/comics', _comic.comicRoutes);
router.use('/chapters', _chapter.chapterRoutes);
router.use('/tags', _tag.tagRoutes);

/*User APIs*/
router.use('/user', _user.userRoutes);

/*Notificatio APIS*/
router.use('/notification', _notification.notificationRoutes);
var apiV1 = router;
exports.apiV1 = apiV1;