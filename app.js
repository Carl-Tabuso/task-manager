import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;
const conn = process.env.DB_CONNECTION;

const mongoClient = new MongoClient(conn, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async () => {
    try {
        await mongoClient.connect();
        await mongoClient.db("Store").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        app.listen(port, (err) => {
            console.log(`Server started and listening to port ${port}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await mongoClient.close();
    }
}

run().catch(console.dir);