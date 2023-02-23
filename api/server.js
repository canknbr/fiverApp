import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import conversationRoute from './routes/conversation.route.js';
import gigRoute from './routes/gig.route.js';
import reviewRoute from './routes/review.route.js';
import orderRoute from './routes/order.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
mongoose.set('strictQuery', true);
const connect = async () => {

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
}
catch (error) {
    console.log('Could not connect to MongoDB');
}
};

app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);


app.use((req, res, next,err) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';

    res.status(errorStatus).send(errorMessage); 

});

app.listen(3000, () => {
    connect();
    console.log('Server is running on port 3000');
});