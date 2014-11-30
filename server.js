//Load Packages ---------------------------------------------------------------
var fs          = require('fs');
var express     = require('express');
var bodyParser  = require('body-parser');
var toobusy     = require('toobusy');
var passport    = require('passport');
var mongoose    = require('mongoose');
var logger      = require('morgan');
var http        = require('http');
var https       = require('https');

//Setup SSL -------------------------------------------------------------------

var privateKey  = fs.readFileSync(__dirname + '/cert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/cert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

//port and protocol setup
var httpport  = process.env.HTTPPORT  || 8080;
var httpsport = process.env.HTTPSPORT || 443;

//Setup Middleware ------------------------------------------------------------
//Init Express
var app = express();

//Setup logging
var accessLogStream = 
          fs.createWriteStream(__dirname + '/request.log', {flags: 'a'});
app.use(logger(':remote-addr \t ' + 
               ':method :url :status :response-time ms \t :res[content-length]',
               {stream: accessLogStream}));

//Connect DB
var mongo = process.env.MONGO || 'mongodb://10.240.142.129:19732/data';
mongoose.connect(mongo);

//init passport
app.use(passport.initialize());

//load saving middleware
app.use(function(req, res, next) {
  if (toobusy()) {
    console.log("Under Heavy Load");
    res.send(503, "Server is busy");
  }
  else next();
});

//setup body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Load controllers
var userController  = require('./app/controllers/user');
var pinController   = require('./app/controllers/pin');
var authController  = require('./app/controllers/auth');
var meController    = require('./app/controllers/me');

//Routes-----------------------------------------------------------------------
//init router
var router = express.Router();

//middleware for all requests
router.use(function(req, res, next) {
  next();
});

//global get
router.get('/', function(req,res) {
  res.json({message: 'welcome to buckit'});
});

// routes for /users --------------------------------------
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

//individual users in /users/:user_id
router.route('/users/:user_id')
  .get(userController.getUser) //missing auth
  .put(authController.isAuthenticated, userController.putUser)
  .delete(authController.isAuthenticated, userController.deleteUser);


// routes for /pins --------------------------------------
router.route('/pins')
  .post(authController.isAuthenticated, pinController.postPins)
  .get(authController.isAuthenticated, pinController.getPins);

//individual pins in /pins/:pin_id
router.route('/pins/:pin_id')
  .get(authController.isAuthenticated, pinController.getPin)
  .put(authController.isAuthenticated, pinController.putPin)
  .delete(authController.isAuthenticated, pinController.deletePin);

//routes for /me-------------------------------------------
router.route('/me')
  .get(authController.isAuthenticated, meController.getMe)
  .put(authController.isAuthenticated, meController.putMe);

//Register Routes -----------------------------------------

app.use('/',router);

//Start Server ----------------------------------------------------------------

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(httpport);
httpsServer.listen(httpsport);

console.log('open on ports ' + httpport + ' and ' + httpsport);
