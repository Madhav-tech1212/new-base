import express from 'express';
import {PORT} from "./config/env.js";

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './Database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/userRouter', authRouter);
app.use('/api/v1/subscriptionRouter', subscriptionRouter);
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, async () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    
    await connectDB();
})

export default app;