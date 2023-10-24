const { mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: {type: String, required: true, default: "0"},
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: { type: Date, default: Date.now },
});
  
const Order = mongoose.model('Order', orderSchema);


module.exports = Order;