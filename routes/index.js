const express = require('express');
const router = express.Router();


// *------------------------------------------------------------------------* //
// *                                                           General init * //
// *------------------------------------------------------------------------* //
const website_name = 'DGDB';


// *------------------------------------------------------------------------* //
// *                                                          Database init * //
// *------------------------------------------------------------------------* //
const pg = require('pg');
const url = require('url');

let config;
let config_loaded = true;
let pg_pool;

try {
  config = require('../config');
}
catch (e) {
  console.warn('Config file not found.');
  config_loaded = false;
}

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  const pg_config = {
    host: params.hostname,
    port: params.port,
    user: auth[0],
    password: auth[1],
    database: params.pathname.split('/')[1],
    ssl: config_loaded ? config.db.ssl : true,
    max: config_loaded ? config.db.max : 10,
    idleTimeoutMillis: config_loaded ? config.db.idleTimeoutMillis : 30000 };

  pg_pool = new pg.Pool(pg_config);
}
else if (config_loaded) {
  pg_pool = new pg.Pool(config.db);
}
else {
  console.error('Cannot connect to database: no config details were found.');
}

pg_pool.on('error', function(err, client) {
  console.error('Idle client error: ', err.message, err.stack);
});


// *------------------------------------------------------------------------* //
// *                                                                Routing * //
// *------------------------------------------------------------------------* //
router.get('/', function(req, res, next) {
  res.render('index', { title: website_name });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register - ' + website_name });
});

module.exports = router;
