var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var db = require('../DB/DB.js');
var router = require('../routes.js');



module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  //var userRouter = express.Router();
  //var linkRouter = express.Router();

  //app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // Set up our routes to BESTIES
  app.use("/besties", router);


  //app.use('/api/users', userRouter); // use user router for all user request

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  //app.use('/api/links', linkRouter); // user link router for link request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  //require('../users/userRoutes.js')(userRouter);
  //require('../links/linkRoutes.js')(linkRouter);
};