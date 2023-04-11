"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _comment = require("../../controllers/comment.controller");
var _history = require("../../controllers/history.controller");
var _user = require("../../controllers/user.controller");
var _auth = require("../../middlewares/auth.middleware");
var _role = require("../../middlewares/role.middleware");
var _comment2 = require("../../validations/comment.validation");
var _user2 = require("../../validations/user.validation");
var router = _express["default"].Router();
router.route('/login').post(_user2.UserValidation.login, _user.UserController.login);
router.route('/google-login').post(_user.UserController.googleLogin);
router.route('/refresh-token').get(_user.UserController.refreshToken);
router.route('/register').post(_user2.UserValidation.register, _user.UserController.register);
router.route('/forgot-password').post(_user.UserController.forgotPassword);
router.route('/reset-password').put(_auth.AuthMiddleware.isAuth, _user.UserController.resetPassword);
router.route('/verify-email').post(_user.UserController.verifyEmail);
router.route('/logout').get(_user.UserController.logout);
router.route('/follow').put(_auth.AuthMiddleware.isAuth, _user.UserController.updateFollowComic).get(_auth.AuthMiddleware.isAuth, _user.UserController.followStatus);
router.route('/comics/quantity-page-followed').get(_auth.AuthMiddleware.isAuth, _user.UserController.getQuantityPageFollowedComics);
router.route('/remove-user').put(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _user.UserController.removeUser);
router.route('/get-all-users').get(_auth.AuthMiddleware.isAuth, _role.RoleMiddleware.isAdmin, _user.UserController.getAllUsers);
router.route('/comics/quantity-page-liked').get(_auth.AuthMiddleware.isAuth, _user.UserController.getQuantityPageLikedComics);
router.route('/comics/followed').get(_auth.AuthMiddleware.isAuth, _user.UserController.getFollowedComics);
router.route('/comics/liked').get(_auth.AuthMiddleware.isAuth, _user.UserController.getLikedComics);
router.route('/like').put(_auth.AuthMiddleware.isAuth, _user.UserController.updateLikeComic).get(_auth.AuthMiddleware.isAuth, _user.UserController.likeStatus);
router.route('/remove-all-history')["delete"](_auth.AuthMiddleware.isAuth, _history.HistoryController.removeAllHistory);
router.route('/comment/:id').put(_auth.AuthMiddleware.isAuth, _comment2.CommentValidation.updateComment, _comment.CommentController.updateComment);
router.route('/comment')["delete"](_auth.AuthMiddleware.isAuth, _comment.CommentController.removeComment).post(_auth.AuthMiddleware.isAuth, _comment2.CommentValidation.postComment, _comment.CommentController.postComment);
router.route('/remove-history')["delete"](_auth.AuthMiddleware.isAuth, _history.HistoryController.removeHistory);
router.route('/history').post(_auth.AuthMiddleware.isAuth, _history.HistoryController.addHistory).get(_auth.AuthMiddleware.isAuth, _history.HistoryController.getHistory);
router.route('/').get(_auth.AuthMiddleware.isAuth, _user.UserController.getFullUser).put(_auth.AuthMiddleware.isAuth, _user.UserController.update);
router.route('/signup').post(_user2.UserValidation.register, _user.UserController.signup);
var userRoutes = router;
exports.userRoutes = userRoutes;