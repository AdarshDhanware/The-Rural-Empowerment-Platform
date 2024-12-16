import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB=async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGO DB connected !!! and DB host is,${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`ERROR WHILE CONNECTING ${process.env.MONGODB_URI}`)
        console.log("MONGO DB Connection Error index.db.js" , error.message);
        process.exit(1);
    }
}

export default connectDB;