import express from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { connectDb } from './db/db-connection.js';
import { tasks } from './routes/tasks.js';
import path from 'node:path';
import notFound from './middlewares/not-found.js';

dotenvExpand.expand(dotenv.config());

const port = process.env.PORT;
const url = process.env.URL;
const conn = process.env.DB_CONNECTION;
const app = express();
const basePath = path.resolve(process.cwd());
const routePrefix = '/api/v1/tasks';

app.use(express.json());
app.use(express.static(path.join(basePath, 'public')));
app.use(routePrefix, tasks);
app.use(notFound);

const run = async () => {
    try {
        await connectDb(conn);
        app.listen(port, (err) => {
            console.log(
                "%s:%s\n%s %s:%s%s", 
                "Server started and listening to port", port, "Visit", url, port, routePrefix
            );
        });
    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);