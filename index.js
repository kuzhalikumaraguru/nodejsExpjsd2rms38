import express from 'express';
import AppRoutes from './Routes/index.js';
const app = express();
const port = process.env.port || 8000;
app.use(express.json());
app.use('/', AppRoutes)
app.listen(port,() => console.log(`Server is listening to ${port}`));