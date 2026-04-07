import { Request, Response } from "express";
import { DoctorService } from "./doctor.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getDoctors = catchAsync(async (req: Request, res: Response) => {
	const doctors = await DoctorService.getDoctors();

	sendResponse(res, {
		httpStatusCode: status.OK,
		success: true,
		message: "Fetched doctors successfully ",
		data: doctors,
	});
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const doctor = await DoctorService.getSingleDoctor(id as string);

	sendResponse(res, {
		httpStatusCode: status.OK,
		success: true,
		message: "Fetched doctor successfully ",
		data: doctor,
	});
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { doctor: doctorData, specialties } = req.body;
	const payload = { ...doctorData, specialties };
	const doctor = await DoctorService.updateDoctor(id as string, payload);

	sendResponse(res, {
		httpStatusCode: status.OK,
		success: true,
		message: "updated doctor successfully ",
		data: doctor,
	});
});

export const DoctorController = {
	getDoctors,
	getSingleDoctor,
	updateDoctor,
};
