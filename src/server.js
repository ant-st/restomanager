const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const sqlite3 = require('sqlite3')
// const apiRouter = require('./api/api.js');

const app = express();

const db = new sqlite3.Database('./database.sqlite');

//Middleware:
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//API:
//app.use('/api', apiRouter);

app.get('/',(req, res, next) => {
        db.all('SELECT * FROM Menus', (err, rows) => {
            if (err) res.status(500).send(err);
            else res.status(200).json({menus: rows});
        });
});

//Error handling:
app.use(errorHandler);

//Server listener:
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)});

module.exports = app;