// Add routes user
const { Router } = require('express');

const userRouter = Router({ mergeParams: true });

userRouter.get('/', (req, res, next) => {
  console.log(req.body);
  console.log(req.params);

  return (res.sendStatus(200));
});

// module.exports = { userRouter };
module.exports = userRouter;
