import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import 'dotenv/config';
import ConnectDB from './Config/MongoDB.js';
import ConnectCloudinary from './Config/Cloudinary.js';
import { AdminRouter } from './Routes/AdminRoute.js';
import { UserRouter } from './Routes/UserRoute.js'
import { DoctorRouter } from './Routes/DoctorRoute.js';

const app = express();
const port = process.env.PORT;

ConnectDB();
ConnectCloudinary();

app.use(cors());
app.use(cookie());
app.use(express.json()); // parses json requests

// Make sure this is defined after all other middlewares, multer should handle multipart before json parsing.
app.use('/api/admin', AdminRouter);
app.use('/api/doctor',DoctorRouter);
app.use('/api/user',UserRouter);


app.get('/', (req, res) => {
  res.send('Server Is Running!');
});

app.listen(port, () => {
  console.log(`Server Is Running on port ${port}`);
});
