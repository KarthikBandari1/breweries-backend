// models/Brewery.js
const db = require('../db/config');

const Brewery = {};

Brewery.findAll = (callback) => {
    db.all('SELECT * FROM breweries', callback);
};

Brewery.search = (query, callback) => {
    db.all('SELECT * FROM breweries WHERE name LIKE ?', [`%${query}%`], callback);
};

Brewery.findById = (id, callback) => {
    db.get('SELECT * FROM breweries WHERE id = ?', [id], callback);
};


module.exports = Brewery;
