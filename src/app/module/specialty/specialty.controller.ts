import { Request, Response } from "express";
import { SpecialtyServices } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const result = await SpecialtyServices.createSpecialty(payload);
	res.status(201).json({
		success: true,
		message: "Specialty created successfully!",
		data: result,
	});
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyServices.getAllSpecialty();
	res.status(200).json({
		success: true,
		message: "Fetched specialties successfully",
		data: result,
	});
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await SpecialtyServices.deleteSpecialty(id as string);

	res.status(200).json({
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
