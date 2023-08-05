import express, { Express, Request } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares";
import taskRoutes from "./routes";

const app: Express = express();
const allowlist: any = ["http://localhost:3000", "http://localhost:3001"];

app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res) => {
    res.status(200).json({
        message: "Hello World",
    });
});
app.use("/api/v1/tasks", taskRoutes);
app.use(errorHandler);

export default app;
