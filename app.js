import express from 'express';
import {PORT} from "./config/env.js";

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/userRouter', authRouter);
app.use('/api/v1/subscriptionRouter', subscriptionRouter);


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT,() =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})

export default app;