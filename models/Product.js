import mongoose from "mongoose";

const Products = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String},
    url: {type: String, required: true},
    availability: {type: Number},
    description: {
        short: {type: String},
        full: {type: String}
    },
    attributes: [{
        title: {type: String},
        variants: {type: Array}
    }]
})

export default mongoose.model('Products', Products)