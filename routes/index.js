const express = require('express');
const router = express.Router();


// *------------------------------------------------------------------------* //
// *                                                           General init * //
// *------------------------------------------------------------------------* //
const website_name = 'DGDB';


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
