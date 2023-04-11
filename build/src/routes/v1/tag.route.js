"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _tag = require("../../controllers/tag.controller");
var _auth = require("../../middlewares/auth.middleware");
var _role = require("../../middlewares/role.middleware");
var _tag2 = require("../../validations/tag.validation");
var router = _express["default"].Router();
router.route('/').post(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _tag2.TagValidation.createNew, _tag.TagController.createNew);
router.route('/:id').put(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _tag2.TagValidation.update, _tag.TagController.update);
router.route('/:id').get(_tag.TagController.getDetailTag);
router.route('/').get(_tag.TagController.getAllTag);
var tagRoutes = router;
exports.tagRoutes = tagRoutes;