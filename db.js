const {credentials} = require('./config');

// Initialize the database connections
const mongoose = require('mongoose');
const connectionString = credentials.mongo.connectionString;
if(!connectionString) {
  console.error("Connection string not reached.");
  process.exit(1);
}
mongoose.connect(connectionString, { useNewUrlParser:true });
const db = mongoose.connection;
db.on('error', err => {
  console.error('Mongo DB error: ' + err.message);
  process.exit(1);
});
db.once('open', () => console.log("\nConnection established"));

