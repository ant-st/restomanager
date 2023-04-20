const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const sqlite3 = require('sqlite3');

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
            /*
            db.run('DROP TABLE IF EXISTS History');
            db.run('CREATE TABLE History (id INTEGER NOT NULL PRIMARY KEY,' +
                'type TEXT NOT NULL,' +
                'name TEXT NOT NULL,' +
                'date TEXT NOT NULL,' +
                'order_time TEXT NOT NULL,' +
                'closing_time TEXT NOT NULL,' +
                'price INTEGER NOT NULL,' +
                'payment TEXT NOT NULL,' +
                'user INTEGER,' +
                'driver INTEGER)');

 */

            db.run('DROP TABLE IF EXISTS Users');
            db.run('CREATE TABLE Users (id INTEGER NOT NULL PRIMARY KEY,' +
                'name TEXT NOT NULL,' +
                'password TEXT NOT NULL,' +
                'admin BOOLEAN NOT NULL,' +
                'manager BOOLEAN NOT NULL,' +
                'active BOOLEAN NOT NULL)');
            db.run(`INSERT INTO Users (name, password, admin, manager, active) VALUES ('Admin', '1234', true, true, true)`);


            db.run('DROP TABLE IF EXISTS Menus');
            db.run('CREATE TABLE Menus (id INTEGER NOT NULL PRIMARY KEY,' +
                'name TEXT NOT NULL)');
            db.run("INSERT INTO Menus (name) VALUES ('Codzienne')");
            db.run("INSERT INTO Menus (name) VALUES ('Sezonowe')");
            db.run("INSERT INTO Menus (name) VALUES ('Pizza')");

            db.run('DROP TABLE IF EXISTS Tables');
            db.run('CREATE TABLE Tables (id INTEGER NOT NULL PRIMARY KEY,' +
                'name TEXT NOT NULL)');
            db.run("INSERT INTO Tables (name) VALUES ('Przy oknie')");
            db.run("INSERT INTO Tables (name) VALUES ('Kominek')");
            db.run("INSERT INTO Tables (name) VALUES ('Przy ladzie')");

            db.run('DROP TABLE IF EXISTS MenuItem');
            db.run('CREATE TABLE MenuItem (id INTEGER NOT NULL PRIMARY KEY,' +
                'name TEXT NOT NULL,' +
                'description TEXT,' +
                'price INTEGER NOT NULL,' +
                'menu_id INTEGER NOT NULL)');
            db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Schabowy', 'Z ziemniakami', 10, 1)`);
            db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Piers z kurczaka', 'Z ziemniakami', 11, 1)`);
            db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Pyry z gzikiem', 'Wielkopolski specjal', 13, 2)`);
            db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Makaron ze szparagami', 'Wegetarianski', 15, 2)`);
            db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Margherita', 'sos, ser, bazylia', 8, 3)`);
            db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Funghi', 'sos, ser, pieczarki', 10, 3)`);
        });
});

//Error handling:
app.use(errorHandler);

//Server listener:
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)});

module.exports = app;