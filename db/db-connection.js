import mongoose from "mongoose";

const connectDb = (conn) => {
    return mongoose.connect(conn, {
        dbName: process.env.DB_NAME,
    });
}

export { connectDb };