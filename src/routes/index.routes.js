import express from 'express';
import products from '../controllers/controller-products.js';
import chat from '../controllers/controller-chat.js';
import user from '../controllers/controller-user.js';
import middlewares from '../../middlewares/index.js';

const router = express.Router()


// REST
router.post('/api/user/login', user.authUser)
router.post('/api/user/register', user.registrerUser)
router.get('/api/chat', chat.getMessages)
router.get('/api/chat/:id', chat.getMessageById)
router.get('/api/products/getAll', [middlewares.verifyToken, middlewares.isModerator], products.getAll)
router.get('/api/products/getbyid/:id', products.getById)
router.get('/api/products/productRandom', products.productRandom)
router.get('/api/products/category/:id', products.getByCategory)
router.post('/api/products/save', products.save)
router.delete('/api/products/delete/:id', products.deleteById)




export default router