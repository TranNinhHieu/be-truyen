"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comicRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _comic = require("../../controllers/comic.controller");
var _comment = require("../../controllers/comment.controller");
var _auth = require("../../middlewares/auth.middleware");
var _role = require("../../middlewares/role.middleware");
var _comic2 = require("../../validations/comic.validation");
var router = _express["default"].Router();
router.route('/').post(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _comic2.ComicValidation.createNew, _comic.ComicController.createNew);
router.route('/:id').put(_comic2.ComicValidation.update, _comic.ComicController.update);
router.route('/update/:id').put( /*AuthMiddleware.isAuth, RoleMiddleware.isAdmin,*/_comic2.ComicValidation.update, _comic.ComicController.update);
router.route('/soft-remove/:id').put(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _comic.ComicController.softRemove);
router.route('/remove/:id')["delete"](_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _comic.ComicController.remove);
router.route('/remove-all')["delete"](_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _comic.ComicController.removeAll);
router.route('/search').get(_comic.ComicController.search);
router.route('/removed-comics/:page').get(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _comic.ComicController.getRemovedComics);
router.route('/tag').get(_comic.ComicController.getAllComicOfTag);
router.route('/unfinished-comics').get(_comic.ComicController.getUnfinishedComics);
router.route('/number-follow-like/:id').get(_comic.ComicController.getFollownLike);
router.route('/detail/:id').get(_comic.ComicController.getDetailComic);
router.route('/quantity-page').get(_comic.ComicController.getQuantityPage);
router.route('/comments').get(_comment.CommentController.getComments);
router.route('/').get(_comic.ComicController.getComic);
var comicRoutes = router;
exports.comicRoutes = comicRoutes;