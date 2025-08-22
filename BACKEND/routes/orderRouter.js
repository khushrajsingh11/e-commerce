
import express from "express";
import authMiddlewere from "../middlewear/auth.js";
import { getAllOrders, placeOrder,userOrder,verifyOrder } from "../controllers/orderController.js";

const Router = express.Router();

Router.post('/place',authMiddlewere,placeOrder);
Router.post('/verify',verifyOrder);
Router.post('/userOrder',authMiddlewere,userOrder);
Router.get('/orders',getAllOrders);

export default Router;