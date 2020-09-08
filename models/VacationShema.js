const mongoose = require('mongoose');

const vacationSchema = mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  sku: String,
  description: String,
  location: {
    search: String,
    coordinates: {
      lat: Number,
      lng: Number,
    }
  },
  price: Number,
  tags: [String],
  inSeason: Boolean,
  available: Boolean,
  requiresWaiver: Boolean,
  maximumGuests: Number,
  notes: String,
  packagesSold: Number 
});

// This adjusts this document as a javascript object, "getters: true" allows virtuals to show up in console.log,
// and "virtuals: true" allows you to get + set properties that aren't actually stored in mongoDB
vacationSchema.set('toObject', { getters: true, virtuals: true });

// This is the constructor for the schema. An instance of this is a document
const Vacation = mongoose.model('Vacation', vacationSchema);

module.exports = Vacation;
