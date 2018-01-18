import { Router } from 'express';

// Every routes
import userRouter from './user/routes';


// Create general Router with mergeParams to access the params of the parent router
const router = Router({ mergeParams: true });
const routerV1 = Router({ mergeParams: true });

// Versionning
router.use('/v1/', routerV1);


/* ---------------------------------------------*/

// V1 definition route (HATEAOS)
routerV1.get('/', (req, res) => {
  res.send({
    '/user/': 'Users Routes',
  }).status(200);
});

// Add Public / Auth routes here ?
routerV1.use('/user/', userRouter);


export default router;
