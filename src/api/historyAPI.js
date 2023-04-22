const express = require('express');
const sqlite3 = require('sqlite3');
const historyRouter = express.Router();

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

historyRouter.get('',(req, res) => {
    db.all('SELECT * FROM History', (err, rows) => {
        if (err) res.status(500).send(err);
        else res.status(200).json({history: rows});
    });

});

historyRouter.post('',(req, res) => {
    let newItem = req.body.history;
    console.log(newItem);
    db.run('INSERT INTO History (name, type, date, order_time, closing_time, price, payment, user, driver) ' +
        'VALUES ($name, $type, $date, $order_time, $closing_time, $price, $payment, $user, $driver)', {
            $name: newItem.name,
            $type: newItem.type,
            $date: new Date().toLocaleDateString('en-GB'),
            $payment: newItem.payment,
            $price: newItem.price,
            $order_time: newItem['order_time'],
            $closing_time: newItem['closing_time'],
            $user: newItem.user,
            $driver: newItem.driver
        }, function (err) {
            if (err) res.status(500).send("Inserting failed!");
            else {
                let id = this.lastID;
                db.get('SELECT * FROM History WHERE id=$id', {$id: id}, (err, row) => {
                    if (err) res.status(500).send("Selecting failed!");
                    else res.status(201).json({history: row});
                });
            }
        }
    );
});

module.exports = historyRouter;