import express from 'express'
import router from './routes/index.routes.js'
// LISTEN SERVER
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

// MANEJO DE ERRORES EN SERVER
server.on('error', error => console.log(`Este es el error ${error}`))

// Rutas
const routerProductos = express.Router()
const routerInicio = express.Router()

app.use('/api/index', routerInicio)
app.use('/api/productos', routerProductos)
app.use(router)

// ----------------------------------------
routerInicio.use(express.json())
routerInicio.use(express.urlencoded({ extended: true }))
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

// _________________________________________________

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Origin", "http://tu_dominio.com");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    next();
});

// ARCHIVOS ESTÁTICOS
app.use(express.static('public'))

//EJS CONFIG
app.set('views', './views')
app.set('view engine', 'ejs')