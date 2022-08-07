import { Router } from "express";
import AuthController from "../controllers/AuthController.js"
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = new Router()

router.post('/registration', [
    check('firstname', "Field firstname shouldn't be empty").isLength({min: 3}).notEmpty(),
    check('lastname', "Field lastname shouldn't be empty").notEmpty(),
    check('email', "Field Email shouldn't be empty").normalizeEmail().isEmail().notEmpty(),
    check('username', "Field username shouldn't be empty").isLength({min: 4}).notEmpty(),
    check('password', "Password should not be less than 4 symbols").isLength({min: 4}).notEmpty(),
], AuthController.registration)
router.post('/login', AuthController.login)
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers)

export default router;