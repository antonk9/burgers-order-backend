import mongoose from "mongoose";

const Categories = new mongoose.Schema({
    title: {type: String, required: true},
    href: {type: String, required: true},
    image: {type: String}
})

export default mongoose.model('Categories', Categories)