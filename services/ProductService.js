import Product from '../models/Product.js'
import FileService from "./FileService.js";

class ProductService {
    async create(product, image) {
        const attributes = JSON.parse(product.attributes)
        const description = JSON.parse(product.description)
        const fileName = FileService.saveFile(image);
        const addedProduct = await Product.create({
            ...product, 
            attributes, 
            description, 
            image: fileName
        })
        return addedProduct
    }

    async getAll() {
        return await Product.find()
    }

    async getOne(id) {
        if (!id) {
            throw new Error(`ID wasn't provided`)
        }

        return await Product.findById(id)
    }

    async update(product) {
        if (!product.id) {
            throw new Error(`Product id wasn't provided`)
        }

        return await Product.findByIdAndUpdate(product.id, product, {new: true})
    }

    async delete(id) {
        if (!id) {
            throw new Error(`Product id wasn't provided`)
        }

        return await Product.findByIdAndDelete(id)
    }
}

export default new ProductService();