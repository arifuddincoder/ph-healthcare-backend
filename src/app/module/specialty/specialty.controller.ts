import { Request, Response } from "express";
import { SpecialtyServices } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
	try {
		const payload = req.body;
		const result = await SpecialtyServices.createSpecialty(payload);
		res.status(201).json({
			success: true,
			message: "created specialty successfully",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

export const SpecialtyController = {
	createSpecialty,
};
