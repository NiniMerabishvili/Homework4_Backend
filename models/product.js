const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    warehouses: [{
        quantity: { type: Number }
    }],
    specifications: { type: Map, of: String }
}, {
    collection: 'products', 
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;