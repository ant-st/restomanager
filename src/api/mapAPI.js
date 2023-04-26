const express = require('express');
const sqlite3 = require('sqlite3');
const mapRouter = express.Router();

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

mapRouter.get('',(req, res) => {
    db.all('SELECT * FROM Map', (err, row) => {
        if (err) res.status(500).send(err);
        else res.status(200).json({center: row});
    });
});

mapRouter.put('',(req, res) => {
    let newCenter = req.body.center;
    db.run('UPDATE Map SET lat = $lat, lng = $lng WHERE id = 1', {$lat: newCenter.lat, $lng: newCenter.lng}, (err) => {
        if (err) res.status(500).send("Updating failed!");
        else res.status(204).send();
    })
});

module.exports = mapRouter;