import AccessData from './controller-access-data.js'
import express from 'express'
import { urlencoded } from 'express'

const controllerProducts = express()
controllerProducts.use(express.json())
controllerProducts.use(urlencoded({ extended: true }))

const productsData = new AccessData('./src/database/productos.txt')
const products = {}

products.getbyId = async (req, res) => {
    res.json(await productsData.getById(parseInt(req.params.id)))
}
products.getAll = async (req, res) => {
    res.json(await productsData.getAll())
}
products.save = async (req, res) => {
    await products.save(
        {
            title: req.body.product_name,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
            weight: req.body.product_weight,
            stock: req.body.product_stock,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        }
    )
}
products.productRandom = async (req, res) => {
    res.json(await productsData.productRandom())
}
products.deleteById = async (req, res) => {
    res.json(await productsData.deleteById(req.params.id))
    console.log(`El producto con id ${req.params.id} esta eliminado`);
}



export default products