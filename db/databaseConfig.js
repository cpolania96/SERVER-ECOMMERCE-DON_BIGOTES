// Inicialización de servidor de MongoDB
import mongoose from "mongoose";

const URL = 'mongodb://localhost:27017/ecommerce'

export default async function connect() {
    try {
        mongoose.connect(URL,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log(`CONEXION DB ESTABLECIDA`)
    } catch (err) {
        console.log(`ERROR EN BASE DE DATOS: ${err}`);
    }
}

// MON GO SESSIONS

const SESSION_URL = 'mongodb://localhost:27017/Auth'

