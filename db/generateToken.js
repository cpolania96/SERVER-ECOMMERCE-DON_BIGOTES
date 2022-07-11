import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return(
        jwt.sign({id}, "Camilo", {
            expiresIn: "30d"
        })
    )
}

export default generateToken