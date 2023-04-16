const express = require('express');
const apiRouter = express.Router();
const menuRouter = require('./menusAPI');
const posRouter = require('./positionsAPI')

apiRouter.use('/menus', menuRouter);
apiRouter.use('/pos', posRouter);

module.exports = apiRouter;