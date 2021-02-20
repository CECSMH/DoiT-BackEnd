
/* MONGODB SETTINGS */
const mongoose = require('mongoose');

const url = 'mongodb://mongo_doit:27017';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;