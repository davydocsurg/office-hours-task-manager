import TaskController from "../controllers";
import express from "express";

const taskRoutes = express.Router();

taskRoutes.get("/", TaskController.getTasks);
taskRoutes.post("/create", TaskController.createTask);

export default taskRoutes;
