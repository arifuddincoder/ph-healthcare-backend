import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const updateDoctorSchema = z.object({
	doctor: z
		.object({
			name: z
				.string("Name must be string")
				.min(5, "Name must be at least 5 characters")
				.max(30, "Name must be at most 30 characters"),
			contactNumber: z
				.string("Contact number must be string")
				.min(11, "Contact number must be at least 11 characters")
				.max(14, "Contact number must be at most 14 characters"),
			address: z
				.string("Address must be string")
				.min(10, "Address must be at least 10 characters")
				.max(100, "Address must be at most 100 characters"),
			registrationNumber: z.string("Registration number must be string"),
			experience: z.int("Experience must be an integer").nonnegative("Experience cannot be negative"),
			gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender must be either MALE or FEMALE"),
			appointmentFee: z.number("Appointment fee must be a number").nonnegative("Appointment fee cannot be negative"),
			qualification: z
				.string("Qualification must be string")
				.min(2, "Qualification must be at least 2 characters")
				.max(50, "Qualification must be at most 50 characters"),
			currentWorkingPlace: z
				.string("Current working place must be string")
				.min(2, "Current working place must be at least 2 characters")
				.max(50, "Current working place must be at most 50 characters"),
			designation: z
				.string("Designation must be string")
				.min(2, "Designation must be at least 2 characters")
				.max(50, "Designation must be at most 50 characters"),
			profilePhoto: z.url("Invalid URL"),
		})
		.partial()
		.optional(),
	specialties: z
		.array(
			z.object({
				specialtyId: z.uuid("Invalid specialty ID"),
				isDeleted: z.boolean().optional(),
			}),
			"Specialties must be an array",
		)
		.optional(),
});
