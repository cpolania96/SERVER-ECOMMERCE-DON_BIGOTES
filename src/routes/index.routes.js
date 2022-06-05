import express from 'express';
import products from '../controllers/controller-products.js';
const router = express.Router()

// REST
router.get('/api/productos/getAll', products.getAll)
router.get('/api/productos/getbyid/:id', products.getById)
router.get('/api/productos/productRandom', products.productRandom)
router.get('/api/productos/category/:id', products.getByCategory)
router.post('/api/productos/save', products.save)
router.delete('/api/productos/delete/:id', products.deleteById)




export default router