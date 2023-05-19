import logger from "morgan";
import * as path from "path";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { receiptsRoutes } from "./routes/receipts.routes"

dotenv.config();

// Routes
import { indexRoutes } from "./routes/index.routes";


const app: Express = express();
const port = process.env.PORT;

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));

app.use("/", indexRoutes);
app.use("/receipts/", receiptsRoutes)

// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server twentytwo');
// });

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

