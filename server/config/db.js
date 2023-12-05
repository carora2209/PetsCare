import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb database ${conn.connection.host}`);
    } catch (error) {
        console.log (`error received in mongodb ${error}`);
    }

};

export default connectDB;