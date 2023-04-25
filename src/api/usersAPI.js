const express = require('express');
const sqlite3 = require('sqlite3');
const usersRouter = express.Router();

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

usersRouter.get('',(req, res) => {
    db.all('SELECT * FROM Users', (err, rows) => {
        if (err) res.status(500).send(err);
        else res.status(200).json({users: rows});
    });
});

usersRouter.post('',(req, res) => {
    let newItem = req.body.user;
    db.run('INSERT INTO Users (name, password, admin, manager, active) ' +
        'VALUES ($name, $password, $admin, $manager, $active)', {
            $name: newItem.name,
            $password: newItem.password,
            $admin: newItem.admin,
            $manager: newItem.manager,
            $active: newItem.active
        }, function (err) {
            if (err) res.status(500).send("Inserting failed!");
            else {
                let id = this.lastID;
                db.get('SELECT * FROM Users WHERE id=$id', {$id: id}, (err, row) => {
                    if (err) res.status(500).send("Selecting failed!");
                    else res.status(201).json({user: row});
                });
            }
        }
    );
});

usersRouter.put('',(req, res) => {
    let idToEdit = req.body.id;
    db.run('UPDATE Users SET active = NOT active WHERE id = $id', {$id: idToEdit}, (err) => {
        if (err) res.status(500).send("Updating failed!");
        else res.status(204).send();
    })
});


module.exports = usersRouter;

