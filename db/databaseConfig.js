// Inicialización de servidor de MongoDB
import mongoose from "mongoose";

const URL = 'mongodb://localhost:27017/ecommerce'

export default async function connect() {
    mongoose.connect(URL,
        {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    )
}
connect().then(console.log(`CONEXION DB ESTABLECIDA`))
connect().catch(err => `ERROR! ${err}`)

// Obtención de DB

