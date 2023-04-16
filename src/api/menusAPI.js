const express = require('express');
const sqlite3 = require('sqlite3');
const menuRouter = express.Router();

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menuRouter.get('',(req, res, next) => {
    db.all('SELECT * FROM Menus', (err, rows) => {
        console.log(rows);
        if (err) res.status(500).send(err);
        else res.status(200).json({menus: rows});
    });
});

menuRouter.post('', (req, res, next) => {
    let newMenu = req.body.menu;
        db.run('INSERT INTO Menus (name) VALUES ($name)', {
            $name: newMenu.name
        }, function (err) {
            if (err) res.status(500).send("Inserting failed!");
            else {
                let id = this.lastID;
                db.get('SELECT * FROM Menus WHERE id=$id', {$id: id}, (err, row) => {
                    if (err) res.status(500).send("Selecting failed!");
                    else res.status(201).json({menu: row});
                })
            }
        });
});

module.exports = menuRouter;