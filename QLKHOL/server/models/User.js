const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: { type: String, required: false },
    firstName: { type: String, required: false },
    fullName: { type: String, required: false },
    role: { type: String, enum: ['admin', 'user', 'teacher'], default: 'user' },
    intro: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
});
  
const User = mongoose.model('User', userSchema);


module.exports = User;