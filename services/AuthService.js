import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import config from '../config.js'

class AuthService {
    async findOne(username) {
        const candidate = await User.findOne({username})

        return candidate
    }

    async createUser(firstname, lastname, email, username, password) {
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"})
        const user = new User({firstname, lastname, email, username, password: hashPassword, roles: [userRole.value]})
        await user.save()
    }

    checkPassword(password, savedPassword) {
        return bcrypt.compareSync(password, savedPassword)
    }

    generateAccessToken(_id, roles) {
        const payload = {
            _id,
            roles
        }

        return jwt.sign(payload, config.secret, {expiresIn: "24h"})
    }

    async find() {
        const users = await User.find({}, {password: 0});

        return users
    }
}

export default new AuthService();