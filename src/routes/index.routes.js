import express from 'express';
import products from '../controllers/controller-products.js';
import chat from '../controllers/controller-chat.js';
import user from '../controllers/controller-user.js';
import middlewares from '../../middlewares/index.js';

const router = express.Router()


// REST

// User__________________________ TERMINADO
router.post('/api/user/login', user.authUser)
router.post('/api/user/register', user.registrerUser)

// Chat__________________________ NO TERMINADO
router.get('/api/chat', chat.getMessages)
router.get('/api/chat/:id', chat.getMessageById)

// Products______________________ EN PROCESO
// --> T = terminados <-- 
router.get('/api/products/get_all', products.getAll) // T
router.get('/api/products/getbyid/:id', products.getById) // T
router.get('/api/products/category/:category', products.getByCategory)

router.put('/api/products/perro/edit-product/:id', [middlewares.verifyToken, middlewares.isAdmin], products.editProduct)

router.post('/api/products/perro/add-product', [middlewares.verifyToken, middlewares.isAdmin], products.addProduct)

router.delete('/api/products/delete/:id', products.deleteById)
// router.delete('/api/products/delete_all', products.deleteById)


// router.delete('/api/products/delete/:id', products.deleteById)



// [middlewares.verifyToken, middlewares.isAdmin]

export default router