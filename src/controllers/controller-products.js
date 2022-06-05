import AccessData from './controller-access-data.js'
import express from 'express'
import { urlencoded } from 'express'
import Product from '../../db/models/products.js'


const controllerProducts = express()
controllerProducts.use(express.json())
controllerProducts.use(urlencoded({ extended: true }))

const productsData = new AccessData('./src/database/productos.txt')
const products = {}

// products.getbyId() = async (req, res) => {

// }
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
products.save = async (req, res) => {
    const product = new Product()

    product.title = req.body.product_title
    product.category = req.body.product_category
    product.thumbnail = req.body.product_thumbnail
    product.UM = req.body.product_umed
    product.stock = req.body.product_stock
    product.price = req.body.product_price
    product.weight = req.body.product_weight
    product.description = req.body.product_description

    product.save((err, productStored) => {
        if (err) {
            return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
        }
        return (
            res.status(200).send({ product: productStored })
        )
    })

}
products.productRandom = async (req, res) => {
    res.json(await productsData.productRandom())
}
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
products.getByCategory = async (req, res) => {
    const idCategory = req.params.category
    res.json(await productsData.getByCategory(idCategory))
}

products.getById = async (req, res) => {
    const idProduct = await req.params['id']
    console.log(`Se está intentando obtener producto con id ${idProduct}`);
    const request = Product.findOne({ _id: idProduct }, (error, docs) => {
        if (error) {
            return console.log(`No se pudo obtener producto ${idProduct}`);
        } else if (!error) {
            return docs
        }
    })
    res.send(request)
}


export default products