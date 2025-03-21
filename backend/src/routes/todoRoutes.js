import Router from "express";
import { getTodos } from "../controllers/todoControllers.js";

const router = Router();

router.get("/todos", getTodos);

export default router;
