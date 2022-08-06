import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return(
        jwt.sign({id}, "Camilo", {
            expiresIn: 86400
        })
    )
}

export default generateToken