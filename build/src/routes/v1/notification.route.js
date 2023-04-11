"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _notification = require("../../controllers/notification.controller");
var _auth = require("../../middlewares/auth.middleware");
var router = _express["default"].Router();
router.route('/:id')["delete"](_auth.AuthMiddleware.isAuth, _notification.NotificationController.remove);
router.route('/').get(_auth.AuthMiddleware.isAuth, _notification.NotificationController.getNotifications).put(_auth.AuthMiddleware.isAuth, _notification.NotificationController.updateStatus);
var notificationRoutes = router;
exports.notificationRoutes = notificationRoutes;