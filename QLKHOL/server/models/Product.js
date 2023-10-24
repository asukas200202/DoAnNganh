const { mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    shortDesc: String,
    description: String,
    image: String,
    alias:  { type: String, required: true },
    teacher: { type: String, required: false },
    teacherId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lessions:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lession'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: { type: Date, default: Date.now },

});
  
const Product = mongoose.model('Product', productSchema);


module.exports = Product;