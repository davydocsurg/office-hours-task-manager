import { NextFunction, Request, Response } from "express";

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new Error(message);
};

const sendErrorProd = (err: any, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        errors: err.errors,
    });
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.errors = err.errors || null;
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    } else if (process.env.NODE_ENV === "production") {
        let error = JSON.parse(JSON.stringify(err));
        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.code === 11000) {
            const message = `Duplicate field value: ${error.keyValue.name}. Please use another value!`;
            error = new Error(message);
        }
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(
                (el: any) => el.message
            );
            const message = `Invalid input data. ${errors.join(". ")}`;
            error = new Error(message);
        }
        sendErrorProd(error, res);
    }
};
