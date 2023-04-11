"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _socket = require("socket.io");
var _http = require("http");
var _mongodb = require("./config/mongodb");
var _enviroment = require("./config/enviroment");
var _v = require("./routes/v1");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
(0, _mongodb.connectDB)().then(function () {
  return console.log('Connected successfully to database server!');
}).then(function () {
  return bootServer();
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});
var bootServer = function bootServer() {
  var app = (0, _express["default"])();
  app.set('trust proxy', 1);
  app.use((0, _cookieParser["default"])());
  app.use((0, _cors["default"])({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: ['https://be-comic.onrender.com', 'http://localhost:3000', 'https://comic-riverdev-web.web.app', 'http://localhost:8080']
  }));

  // Enable req.body data
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  // Use APIs v1
  app.use('/v1', _v.apiV1);
  var httpServer = (0, _http.createServer)(app);
  var io = new _socket.Server(httpServer, {
    cors: {
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      origin: ['https://be-comic.onrender.com', 'http://localhost:3000', 'https://comic-riverdev-web.web.app', 'http://localhost:5000']
    }
  });
  httpServer.listen(process.env.PORT, function () {
    console.log("Hello river, I'm running at port: ".concat(5000, "/"));
  });
  io.on('connection', function (socket) {
    console.log('someone has connected!');
    socket.on('disconnect', function () {
      console.log('someone has left!');
    });
    socket.on('client-like-comic', function (data) {
      socket.emit('server-like-comic', data);
    });
  });
};