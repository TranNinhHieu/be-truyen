"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chapterRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _chapter = require("../../controllers/chapter.controller");
var _auth = require("../../middlewares/auth.middleware");
var _role = require("../../middlewares/role.middleware");
var _chapter2 = require("../../validations/chapter.validation");
var router = _express["default"].Router();
router.route('/').post(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _chapter2.ChapterValidation.createNew, _chapter.ChapterController.createNew);
router.route('/:id').put(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _chapter2.ChapterValidation.update, _chapter.ChapterController.update);
router.route('/comic/').get(_chapter.ChapterController.getAllChapterOfComic);
router.route('/new-comics').get(_chapter.ChapterController.getNewComics);
router.route('/quantity/:comicID').get(_chapter.ChapterController.getQuantityChapter);
router.route('/').get(_chapter.ChapterController.getFullChapter);
var chapterRoutes = router;
exports.chapterRoutes = chapterRoutes;