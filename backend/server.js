import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/clodinary.js';
import adminRoutes from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectcloudinary()

// Middleware
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
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
