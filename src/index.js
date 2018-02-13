const { Router } = require('express');
const passport = require('passport');

// #Routes
const userRouter = require('./user/routes');

// #Add passport strategie
const { setAuthentication } = require('./Services/authentication');

setAuthentication(passport);

// #Merge params to give access to them
const router = Router({ mergeParams: true });
const routerV1 = Router({ mergeParams: true });

// #Versionning
router.use('/v1/', routerV1);

// #V1 definition route (HATEAOS)
routerV1.get('/', (req, res) => {
  res.send({
    '/v1/user/': 'Users Routes [Auth & not Auth]',
  }).status(200);
});


// #Check if the user is authenticated
routerV1.get('/authenticated', passport.authenticate(['jwt'], { session: false }), (req, res) => {
  res.send({
    message: 'User authenticated',
    err: null,
    data: req.user,
  }).status(200);
});


// Add Public / Auth routes here ?
routerV1.use('/user/', userRouter);

module.exports = { router };
