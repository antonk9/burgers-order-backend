import Router from 'express';
import CategoriesController from "../controllers/CategoriesController.js";

const router = new Router()

router.post('/', CategoriesController.create);
router.get('/', CategoriesController.getAll);
router.get('/:id', CategoriesController.getOne);
router.put('/:id', CategoriesController.update);
router.delete('/:id', CategoriesController.delete);

export default router;