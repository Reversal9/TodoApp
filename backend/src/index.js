import "dotenv/config"; // allow use of .env
import express from "express"; // framework
import todoRoutes from "./routes/todoRoutes.js"; // routes
import * as db from "./lib/db.js"; // pooling connection
import debug from "debug"; // debug
import loggerMiddleware from "./middleware/logger.js";

const logger = debug("app");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

// Log every http request
app.use(loggerMiddleware);

app.use(todoRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const server = app.listen(port, () => {
    logger(`Example app listening at http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
    logger("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        logger("HTTP server closed");
    });
    db.pool.end(() => {
        logger("Database connection closed");
    });
});

process.on("SIGINT", () => {
    logger("SIGINT signal received: closing HTTP server");
    server.close(() => {
        logger("HTTP server closed");
    });
    db.pool.end(() => {
        logger("Database connection closed");
    });
});
