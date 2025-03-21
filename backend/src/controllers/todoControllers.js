import * as db from "../lib/db.js";
import debug from "debug";

const logger = debug("todos");

const getTodos = async (req, res) => {
  try {
    // Perform the SELECT query for todos
    const { rows } = await db.query("SELECT * from jonne.todos");
    logger("Data fetched: ", rows);

    res.status(200).send(rows);
  } catch (error) {
    logger("Error fetching todos: ", error);
    res.status(500).send(error);
  }
};

const addTodo = async (req, res) => {
  try {
    const { content } = req.body;
    const { rows } = await db.query(
      "INSERT INTO jonne.todos (content) VALUES ($1)",
      [content],
    );

    logger("Added todo: ", rows);

    res.status(200).send(rows);
  } catch (error) {
    logger("Error adding todo: ", error);
    res.status(400).send(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const { rows } = await db.query(
      "UPDATE jonne.todos SET content = $1 WHERE id = $2",
      [content, id],
    );

    logger("Updated todo: ", rows);

    res.status(200).send(rows);
  } catch (error) {
    logger("Error updating todo: ", error);
    res.status(400).send(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("DELETE FROM jonne.todos WHERE id = $1", [
      id,
    ]);

    logger("Deleted todo: ", rows);

    res.status(200).send(rows);
  } catch (error) {
    logger("Error deleting todo: ", error);
    res.status(400).send(error);
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
