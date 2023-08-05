import { Request, Response } from "express";
import { TaskModel } from "../models";

class TaskController {
    constructor() {
        this.createTask = this.createTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
    }

    async createTask(req: Request, res: Response) {
        try {
            const { name, description, completed } = req.body;
            const task = await TaskModel.create({
                name,
                description,
                completed,
            });

            return res.status(201).json({
                status: "success",
                data: task,
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    }

    async getTasks(req: Request, res: Response) {
        try {
            const tasks = await TaskModel.find();
            if (tasks.length === 0) {
                return res.status(404).json({
                    status: "fail",
                    message: "No tasks found.",
                });
            }

            return res.status(200).json({
                status: "success",
                data: tasks,
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    }
}

export default new TaskController();
