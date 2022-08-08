import express from 'express'
import { urlencoded } from 'express'
import Product from '../../db/models/products.js'


const controllerProducts = express()
controllerProducts.use(express.json())
controllerProducts.use(urlencoded({ extended: true }))

const products = {}

// Métodos Get

products.getAll = async (req, res) => {
    Product.find({}, (error, docs) => {
        if (!error) {
            console.log('Petición para obtener todos los datos de productos')
            res.send({
                docs
            })
        } else {
            console.log(error);
        }
    })
}

products.getByCategory = async (req, res) => {
    const idCategory = req.params.category
    Product.find({ category: idCategory }, (error, docs) => {
        try {
            if (!error) {
                console.log(docs)
                return res.send(docs)
            } else {
                return res.send('No se pudo obtener los productos')
            }
        } catch (error) {

        }
    })
}

products.getById = async (req, res) => {
    const idProduct = await req.params['id']
    console.log(`Se está intentando obtener producto con id ${idProduct}`);
    try {
        Product.findOne({ _id: idProduct }, (error, docs) => {
            if (error) {
                return res.send(`No se pudo obtener producto`);
            } else if (!error) {
                return res.send(docs)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Método put

products.editProduct = async (req, res) => {
    const id = await req.params['id']
    const body = await req.body

    const { title, category, thumbnail, umed, stock, price, weight, description } = body || {}

    const query = { _id: id }
    const fields = {
        title,
        category,
        thumbnail,
        umed,
        stock,
        price,
        weight,
        description
    }
    Product.updateOne(query, fields, (error) => {
        if(!error) {
            res.status(200).send(`Producto editado: ${title}`)
        }
    })
}




// Método Post

products.addProduct = async (req, res) => {
    const product = new Product()

    product.title = req.body.title
    product.category = req.body.category
    product.thumbnail = req.body.thumbnail
    product.UM = req.body.umed
    product.stock = req.body.stock
    product.price = req.body.price
    product.weight = req.body.weight
    product.description = req.body.description

    product.addProduct((err, productStored) => {
        if (err) {
            return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
        }
        return (
            res.status(200).send({ product: productStored })
        )
    })

}
// Método delete

products.deleteById = async (req, res) => {
    const requestID = await req.params['id']
    console.log(`Se esta realizando una peticion de borrar por ID ${requestID}`);
    Product.deleteOne({ _id: requestID }, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.send('Producto eliminado')
        } else {
            console.log(err);
        }
    })
}

export default products