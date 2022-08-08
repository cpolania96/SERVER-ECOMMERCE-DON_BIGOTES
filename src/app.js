import express from 'express'
import router from './routes/index.routes.js'
import cors from 'cors'
import connect from '../db/databaseConfig.js'
// import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { createRoles } from './libs/initial-setup.js'

// LISTEN SERVER
const app = express()
const PORT = process.env.PORT || 9090
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

// Sesiones_______________________
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}))
//________________________________

// CORS___________________________
app.use(cors())
//________________________________

// MANEJO DE ERRORES EN SERVER
server.on('error', error => console.log(`Este es el error ${error}`))

// Cookies
app.use(cookieParser('MY SECRET'))
app.get('/api/isSigned', (req, res) => {
    console.log(`Request para obtener cookie`);
    res.cookie('signed', 'cookie', { signed: true })
    res.send('Está logeado')
})

// InitDB
connect()

// Roles__________________________
createRoles()

// Rutas
const routerProductos = express.Router()
const routerInicio = express.Router()
const routerUser = express.Router()

app.use('/api/index', routerInicio)
app.use('/api/products', routerProductos)
app.use('/api/user', routerUser)
app.use(router)

// ----------------------------------------

routerInicio.use(express.json())
routerInicio.use(express.urlencoded({ extended: true }))
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))
routerUser.use(express.json())
routerUser.use(express.urlencoded({ extended: true }))

// _________________________________________________


// ARCHIVOS ESTÁTICOS
app.use(express.static('public'))

//EJS CONFIG
app.set('views', './views')
app.set('view engine', 'ejs')




