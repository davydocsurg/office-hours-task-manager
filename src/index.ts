import dotenv from "dotenv";
import app from "./app";
import { dbConnection } from "./db";

dotenv.config();

process.on("uncaughtException", (err: any) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

if (!process.env.APP_PORT) {
    process.exit(1);
}
// exports.APP_PORT = parseInt(process.env.APP_PORT, 10); // or whatever port you want
dbConnection();

const server = app.listen(process.env.APP_PORT, () => {
    console.log(`App running on port ${process.env.APP_PORT}...`);
});

process.on("unhandledRejection", (err: any) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// export default server;
