import Category from '../models/Category.js'
import FileService from "./FileService.js";

class CategoryService {
    async create(category, image) {
        const fileName = FileService.saveFile(image);
        const addedCategory = await Category.create({...category, image: fileName})
        return addedCategory
    }

    async getAll() {
        return await Category.find()
    }

    async getOne(id) {
        if (!id) {
            throw new Error(`ID wasn't provided`)
        }

        return await Category.findById(id)
    }

    async update(category) {
        if (!category.id) {
            throw new Error(`Category id wasn't provided`)
        }

        return await Category.findByIdAndUpdate(category.id, category, {new: true})
    }

    async delete(id) {
        if (!id) {
            throw new Error(`Category id wasn't provided`)
        }

        return await Category.findByIdAndDelete(id)
    }
}

export default new CategoryService();