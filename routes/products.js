import Router from 'express';
import ProductsController from "../controllers/ProductsController.js";

const router = new Router()

router.post('/', ProductsController.create);
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getOne);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.delete);

export default router;