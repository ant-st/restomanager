const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const sqlite3 = require('sqlite3')
const apiRouter = require('./API.js');

const app = express();

const db = new sqlite3.Database('./database.sqlite');

//Middleware:
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//API:
app.use('/api', apiRouter);

app.get('/restart',(req, res, next) => {
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS Menus');
            db.run('CREATE TABLE Menus (id INTEGER NOT NULL PRIMARY KEY,' +
                'name TEXT NOT NULL)');
            db.run("INSERT INTO Menus (name) VALUES ('Codzienne')");
            db.run("INSERT INTO Menus (name) VALUES ('Sezonowe')");
            db.run("INSERT INTO Menus (name) VALUES ('Pizza')");
        });
});

//Error handling:
app.use(errorHandler);

//Server listener:
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)});

module.exports = app;