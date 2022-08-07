import express from 'express';
import products from '../controllers/controller-products.js';
import chat from '../controllers/controller-chat.js';
import user from '../controllers/controller-user.js';
import middlewares from '../../middlewares/index.js';

const router = express.Router()


// REST

// User__________________________
router.post('/api/user/login', user.authUser)
router.post('/api/user/register', user.registrerUser)

// Chat__________________________
router.get('/api/chat', chat.getMessages)
router.get('/api/chat/:id', chat.getMessageById)

// Products______________________
router.get('/api/products/get_all', [middlewares.verifyToken, middlewares.isAdmin], products.getAll)
router.get('/api/products/getbyid/:id', products.getById)
router.get('/api/products/product_random', products.productRandom)
router.get('/api/products/category/:id', products.getByCategory)
router.post('/api/products/add_product', [middlewares.verifyToken, middlewares.isAdmin], products.addProduct)
router.delete('/api/products/delete/:id', products.deleteById)




export default router