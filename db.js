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

const Vacation = require('./models/VacationShema');
const VacationInSeasonListener = require('./models/VacationInSeasonListenerSchema');
const Attraction = require('./models/AttractionSchema');

let options = {}
module.exports = {
  getVacations: async (options) => {Vacation.find(options)},
  getVacationBySku: async (sku) => {Vacation.findOne({sku})},
  addVacationInSeasonListener: async (email, sku) => {
    await VacationInSeasonListener.updateOne(
      { email },
      { $push: {skus: sku}},
      { upsert: true }
    )
  },
  getAttractions: async (options) => {Attraction.find(options)},
  addAttraction: async (addAttraction) => {new Attraction(addAttraction.save())}
};