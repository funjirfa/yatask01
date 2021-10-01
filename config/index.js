const path = require('path');


const store = path.resolve(__dirname, '../store');
const dump = path.resolve(store, 'db.json');
const images = path.resolve(store, 'images');

module.exports = {
  port: 8080,
  store,
  dump,
  images,
};
