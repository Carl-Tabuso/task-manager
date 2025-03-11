import express, { json } from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { connectDb } from './db/db-connection.js';
import { tasks } from './routes/tasks.js';
import path from 'node:path';
import notFound from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';

dotenvExpand.expand(dotenv.config());

const port = process.env.PORT;
const conn = process.env.DB_CONNECTION;
const app = express();
const basePath = path.resolve(process.cwd());
const routePrefix = '/api/v1/tasks';

app.use(json());
app.use(express.static(path.join(basePath, 'public')));
app.use(routePrefix, tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const run = async () => {
    try {
        await connectDb(conn);
        app.listen(port, (err) => {
            console.log(`Server started and listening to port ${port}...`);
        });
    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);