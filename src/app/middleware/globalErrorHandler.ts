/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import status from "http-status";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (envVars.NODE_ENV === "development") {
		console.log("Error from Global Error Handler: ", err);
	}

	let statusCode: number = status.INTERNAL_SERVER_ERROR;
	let message: string = "Internal Server error";

	res.status(statusCode).json({
		success: false,
		message: message,
		error: err.message,
	});
};
