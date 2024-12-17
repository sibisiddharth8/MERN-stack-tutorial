import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import productRoutes from './routes/products.route.js'

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

// Start the server
app.listen(5000, () => {
    connectDB();
    console.log('Server started on port 5000');
});
