const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  colour: { type: String, required: true },
  style: { type: String, required: true },
  rope: { type: Number, required: true },
  date: { type: Date, required: true },
  stringDate: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Routes', RouteSchema);
