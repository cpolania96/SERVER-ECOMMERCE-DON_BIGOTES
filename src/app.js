import express from 'express'
import router from './routes/index.routes.js'
import cors from 'cors'
import connect from '../db/databaseConfig.js'
// import { Server } from 'socket.io'

// LISTEN SERVER
const app = express()
const PORT = process.env.PORT || 9090
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})
// // IO Server
// const IOServer = Server.IOServer
// const io = new IOServer(server)

// io.on('connection', (socket) => {
//     console.log('Usuario conectado')
//     socket.emit('Mi mensaje', 'Este es mi mensaje desde el servidor ')
// })


// CORS
app.use(cors())
// MANEJO DE ERRORES EN SERVER
server.on('error', error => console.log(`Este es el error ${error}`))

// InitDB
connect()

// Rutas
const routerProductos = express.Router()
const routerInicio = express.Router()
const routerUser = express.Router()

app.use('/api/index', routerInicio)
app.use('/api/productos', routerProductos)
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