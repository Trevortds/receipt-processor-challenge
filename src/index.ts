import loggerModule from "morgan";
import * as path from "path";
import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { receiptsRoutes } from "./routes/receipts.routes"

dotenv.config();

// Routes
import { indexRoutes } from "./routes/index.routes";
import logger from "./config/logger";

const app: Express = express();
const port = process.env.PORT;

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(loggerModule("dev"));

app.use("/", indexRoutes);
app.use("/receipts/", receiptsRoutes)

// @ts-ignore don't need to type this
app.use((err, req, res, next) => {
    logger.error(err.message)
    logger.error(err.stack)
    res.status(err.statusCode || err.status || 500).send({
        error: err.message,
        stack: err.stack
    })
})

// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server twentytwo');
// });

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

