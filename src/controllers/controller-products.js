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
            title: req.body.nombre,
            price: req.body.precio,
            thumbnail: req.body.urlimg
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