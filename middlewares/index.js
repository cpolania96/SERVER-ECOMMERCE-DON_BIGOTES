import * as JWT from "./authJWT.js";


const middlewares = {}

middlewares.verifyToken = JWT.verifyToken
middlewares.isModerator = JWT.isModerator


export default middlewares