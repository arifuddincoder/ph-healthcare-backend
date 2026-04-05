import { Request, Response } from "express";
import { SpecialtyServices } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const result = await SpecialtyServices.createSpecialty(payload);
	sendResponse(res, {
		httpStatusCode: 201,
		success: true,
		message: "Created specialties successfully",
		data: result,
	});
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyServices.getAllSpecialty();

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Fetched specialties successfully",
		data: result,
	});
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await SpecialtyServices.deleteSpecialty(id as string);

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Deleted specialty successfully",
		data: result,
	});
});

export const SpecialtyController = {
	createSpecialty,
	getAllSpecialty,
	deleteSpecialty,
};
