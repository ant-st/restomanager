const express = require('express');
const sqlite3 = require('sqlite3');
const tablesRouter = express.Router();

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

tablesRouter.get('',(req, res) => {
    db.all('SELECT * FROM Tables', (err, rows) => {
        if (err) res.status(500).send(err);
        else res.status(200).json({tables: rows});
    });
});

module.exports = tablesRouter;