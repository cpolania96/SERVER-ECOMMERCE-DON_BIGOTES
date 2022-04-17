import express from 'express';
import products from '../controllers/controller-products.js';
const router = express.Router()

// REST
router.get('/api/productos/getAll', products.getAll)
router.get('/api/productos/:id', products.getbyId)
router.get('/api/productos/productRandom', products.productRandom)
router.post('/api/productos/save', products.save)
router.delete('/api/productos/:id', products.deleteById)

export default router