const express = require('express');
const apiRouter = express.Router();

const menuRouter = require('./menusAPI');
const posRouter = require('./positionsAPI');
const tablesRouter = require('./tablesAPI')

apiRouter.use('/menus', menuRouter);
apiRouter.use('/pos', posRouter);
apiRouter.use('/tables', tablesRouter);

module.exports = apiRouter;