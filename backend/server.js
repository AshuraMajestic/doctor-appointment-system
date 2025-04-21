import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/clodinary.js';

import adminRoutes from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH','PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token','atoken']
}));

app.use(express.json());

// API Endpoints
app.use('/api/admin', adminRoutes)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
  res.send('Api Working');
});

// Server Start
app.listen(PORT, () => console.log(`✅ Server Started on Port ${PORT}`));
