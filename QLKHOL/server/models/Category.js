const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  banner: String,
  alias: String,
  createdAt: { type: Date, default: Date.now },

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
