import express from 'express';
import {PORT} from "./config/env.js";

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './Database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js'; // Arcjet Middleware

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(arcjetMiddleware); // Arcjet Middleware

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, async () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    
    await connectDB();
})

export default app;