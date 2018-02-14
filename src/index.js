const { Router } = require('express');
const passport = require('passport');

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

// #1- Routes
const User = require('./user/routes');

// #2- Instanciate Routes
const userRouter = new User({ passport });

// #3 - Add Routes
routerV1.use('/user/', userRouter.getRouter());

module.exports = { router };
