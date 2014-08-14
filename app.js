if ( process.env.NEW_RELIC_ENABLED ) {
  require( "newrelic" );
}

var express = require( "express" ),
    helmet = require( "helmet" ),
    WebmakerAuth = require( "webmaker-auth" ),
    Path = require( "path" ),
    http = require( "http" ),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    morgan = require('morgan'),
    swig  = require('swig'),
    messina;

// Expose internals
var env = require( "./lib/environment" ),
    middleware = require( "./lib/middleware" ),
    router = require( "./router" );

var app = express(),
    webmakerAuth = new WebmakerAuth({
      loginURL: env.get( "LOGIN" ),
      secretKey: env.get( "SESSION_SECRET" ),
      forceSSL: env.get( "FORCE_SSL" ),
      domain: env.get( "COOKIE_DOMAIN" )
    }),
    logger,
    port;

// Logging middleware
if ( env.get( "ENABLE_GELF_LOGS" ) ) {
  messina = require( "messina" );
  logger = messina( "MakeDrive-" + env.get( "NODE_ENV" ) || "development" );
  logger.init();
  app.use( logger.middleware() );
} else {
  app.use(morgan('dev'));
}
// This is where all the magic happens!
app.engine('.js', swig.renderFile);
app.engine('.html', swig.renderFile);
app.set('views', __dirname + '/brackets-overrides');

// General middleware
app.disable( "x-powered-by" );
app.use( helmet.nosniff() );
app.use( helmet.hsts() );
app.enable( "trust proxy" );
app.use( compression() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( webmakerAuth.cookieParser() );
app.use( webmakerAuth.cookieSession() );

router( app );
// Setup static route to serve Nimble/Brackets on "/" (root of the server).
app.use( "/", express.static(Path.join(__dirname, 'nimble/src')) );
// External libraries that we want to expose for Nimble/Brackets e.g. Extensions.
app.use( "/thirdparty", express.static(Path.join(__dirname, 'bower_components')) );
// This route is exposed for extension loading (see makedrive-sync-icon in ExtensionLoader.js)
app.use( "/extensions/default/", express.static(Path.join(__dirname, 'bower_components')) );

app.use( middleware.errorHandler );
app.use( middleware.fourOhFourHandler );

port = process.env.PORT || env.get( "PORT", 8003 );
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
