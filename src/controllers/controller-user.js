import User from "../../db/models/user.js"
import generateToken from "../../db/generateToken.js"
import "dotenv"
import role from "../../db/models/role.js"


const user = {}

user.registrerUser = async (req, res) => {
    const { name, email, password, pic, roles } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        try {
            res.status(400)
            res.send({
                message: "El correo ya esta registrado"
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        const user = await User.create({
            name,
            email,
            password,
            pic
        })
        if (user) {
            if (roles) {
                const foundRoles = await role.find({name: {$in: roles}})
                user.roles = foundRoles.map(role => role._id)
            } else {
                const roleFind = await role.findOne({name: 'user'})
                user.roles = [roleFind._id]
            }
            console.log(user);
            res.send({
                token: generateToken(user._id),
                message: 'Cuenta creada correctamente'
            })
        } else {
            res.status(400)
            throw new Error('Failed to create the user')
        }
    }

}
user.authUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id)
        res.status(200).send({ token })
    } else {
        res.status(500).send('Credenciales inválidas')
    }
}

export default user






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































