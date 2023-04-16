const express = require('express');
const sqlite3 = require('sqlite3');
const posRouter = express.Router();

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

posRouter.get('',(req, res) => {
    db.all('SELECT * FROM MenuItem', (err, rows) => {
        if (err) res.status(500).send(err);
        else res.status(200).json({positions: rows});
    });
});

posRouter.post('',(req, res) => {
    let newItem = req.body.menuItem;
    console.log(newItem);
    db.run('INSERT INTO MenuItem (name, description, price, menu_id) VALUES ($name, $description, $price, $menu_id)', {
            $name: newItem.name,
            $description: newItem.description,
            $price: newItem.price,
            $menu_id: newItem['menu_id']
        }, function (err) {
            if (err) res.status(500).send("Inserting failed!");
            else {
                let id = this.lastID;
                db.get('SELECT * FROM MenuItem WHERE id=$id', {$id: id}, (err, row) => {
                    if (err) res.status(500).send("Selecting failed!");
                    else res.status(201).json({menuItem: row});
                });
            }
        }
    );
});

module.exports = posRouter;
