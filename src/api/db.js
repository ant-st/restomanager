const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Menus');
    db.run('CREATE TABLE Menus (id INTEGER NOT NULL PRIMARY KEY,' +
        'title TEXT NOT NULL)');

    db.run('DROP TABLE IF EXISTS MenuItems');
    db.run('CREATE TABLE MenuItem (id INTEGER NOT NULL PRIMARY KEY,' +
        'name TEXT NOT NULL,' +
        'description TEXT,' +
        'price INTEGER NOT NULL,' +
        'menu_id INTEGER NOT NULL)');


    db.serialize(function() {
        db.run("INSERT INTO Menus (title) VALUES ('Codzienne')");
        db.run("INSERT INTO Menus (title) VALUES ('Sezonowe')");
        db.run("INSERT INTO Menus (title) VALUES ('Pizza')");
        db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Schabowy', 'Smażony schabowy z ziemniakami i surówką', 12, 1)`);
        db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Pierogi z mięsem', '12 szt. gotowanych pierogoów', 10, 1)`);
        db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Pyry z gzikiem', 'Wielkopolski specjał', 9, 2)`);
        db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Makaron ze szparagami', '', 15, 2)`);
        db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Margherita', 'sos, ser, bazylia', 5, 3)`);
        db.run(`INSERT INTO MenuItem (name, description, price, menu_id) VALUES ('Funghi', 'sos, ser, pieczarki, bazylia', 7, 3)`);


    });


});

