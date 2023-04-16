const express = require('express');
const apiRouter = express.Router();
const menuRouter = require('./menusAPI')

apiRouter.use('/menus', menuRouter);

module.exports = apiRouter;