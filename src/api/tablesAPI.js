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

tablesRouter.post('', (req, res) => {
    let newTable = req.body.table;
    db.run('INSERT INTO Tables (name) VALUES ($name)', {
        $name: newTable.name
    }, function (err) {
        if (err) res.status(500).send("Inserting failed!");
        else {
            let id = this.lastID;
            db.get('SELECT * FROM Tables WHERE id=$id', {$id: id}, (err, row) => {
                if (err) res.status(500).send("Selecting failed!");
                else res.status(201).json({table: row});
            })
        }
    });
});

tablesRouter.delete('', (req, res) => {
    db.run('DELETE FROM Tables WHERE id=$id', {$id: req.body.table.id}, (err) => {
        if (err) res.status(500).send();
        else res.status(204).send();
    });
});

module.exports = tablesRouter;