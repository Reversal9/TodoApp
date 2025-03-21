import * as db from "../lib/db.js";
import debug from "debug";

const logger = debug("todos");

const getTodos = async (req, res) => {
    logger("Fetching todos...");

    // Perform the SELECT query for todos
    const { rows } = await db.query("SELECT * from jonne.todos");

    res.status(200).send(rows);
};

export { getTodos };
