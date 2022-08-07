import * as JWT from "./authJWT.js";

const middlewares = {}

// Verificacion de Token_______________
middlewares.verifyToken = JWT.verifyToken

// Verificación de Roles_______________
middlewares.isAdmin = JWT.isAdmin
middlewares.isModerator = JWT.isModerator



export default middlewares