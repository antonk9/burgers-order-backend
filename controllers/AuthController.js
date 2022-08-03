import AuthService from "../services/AuthService.js";
import { validationResult } from 'express-validator';

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty) {
                return res.status(400).json({message: 'Error while validate user data', errors})
            }

            const {firstname, lastname, email, username, password} = req.body
            const candidate = await AuthService.findOne(username)

            if (candidate) {
                return res.status(400).json({message: "User with this username exists"})
            }

            await AuthService.createUser(firstname, lastname, email, username, password)

            return res.json({
                message: "User was registered",
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body

            const user = await AuthService.findOne(username)
            if (!user) {
                return res.status(400).json({message: `User with username ${username} doesn't exists`})
            }
            const validPassword = AuthService.checkPassword(password, user.password)

            if (!validPassword) {
                return res.status(400).json({message: `Password is incorrect`})
            }
            const token = AuthService.generateAccessToken(user._id, user.roles);

            return res.json({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: user.roles,
                token})
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await AuthService.find();

            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

export default new authController()