import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddllewere from '../middlewear/auth.js';
const cartRouter = express.Router();

cartRouter.post('/add',authMiddllewere,addToCart);
cartRouter.post('/remove',authMiddllewere,removeFromCart);
cartRouter.get('/get',authMiddllewere,getCart);
export default cartRouter;