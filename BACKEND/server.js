import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import path from 'path';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
import 'dotenv/config';

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());


connectDb();
dotenv.config();





app.use("/api/food", foodRouter);


app.use('/api/user',userRouter);

app.use('/api/cart',cartRouter);

app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
