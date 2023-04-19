const express = require('express');
const apiRouter = express.Router();

const menuRouter = require('./menusAPI');
const posRouter = require('./positionsAPI');
const tablesRouter = require('./tablesAPI');
const historyRouter = require('./historyAPI');

apiRouter.use('/menus', menuRouter);
apiRouter.use('/pos', posRouter);
apiRouter.use('/tables', tablesRouter);
apiRouter.use('/history', historyRouter);

module.exports = apiRouter;