const { mongoose } = require("mongoose");

const lessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    video: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});
  
const Lession = mongoose.model('Lession', lessionSchema);


module.exports = Lession;