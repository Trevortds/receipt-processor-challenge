import { createLogger, format, transports } from "winston";


const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const logger = createLogger({
    levels: logLevels,
    format: process.env.NODE_ENV !== "production" ? format.cli() : undefined,
    transports: [new transports.Console()], // depending on deployment method we might put more transports here
    // assuming we're using containers and capturing the output (eg in cloudwatch), console is fine.
})

export default logger