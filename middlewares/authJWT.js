import jwt from 'jsonwebtoken'
import config from '../config.js';
import Role from '../db/models/role.js';
import User from '../db/models/user.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.status(403).json({ message: 'No token provided' })
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id

        const user = User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).send({ message: 'Usuario no existe' })

        next()

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

}

export const isModerator = async (req, res, next) => {
    const id = req.userId
    const user = await User.findById(id)
    const roles = await Role.find({ id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next()
            return
        }
    }
    return res.status(401).send({ message: 'Require moderator role' })
}

export const isAdmin = async (req, res, next) => {
    const id = req.userId
    const user = await User.findById(id)
    const roles = await Role.find({ id: { $in: user } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next()
            return
        }
    }
    return res.status(401).send({ message: 'Require admin role' })
}