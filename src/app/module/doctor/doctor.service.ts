import { prisma } from "../../lib/prisma";
import { TUpdateDoctorPayload } from "./doctor.interface";

const getDoctors = async () => {
	const doctors = await prisma.doctor.findMany({
		include: {
			user: true,
			specialties: {
				include: {
					specialty: true,
				},
			},
		},
	});

	return doctors;
};

const getSingleDoctor = async (id: string) => {
	const doctor = await prisma.doctor.findUnique({
		where: { id },
		include: {
			user: true,
			specialties: {
				include: {
					specialty: true,
				},
			},
		},
	});
	return doctor;
};

const updateDoctor = async (id: string, payload: TUpdateDoctorPayload) => {
	const { specialties, ...doctorData } = payload;

	await prisma.$transaction(async (tx) => {
		// update doctor basic info
		await tx.doctor.update({
			where: { id },
			data: doctorData,
		});

		// handle specialties
		if (specialties && specialties.length > 0) {
			// delete specialties marked as deleted
			const deletedSpecialtyIds = specialties.filter((s) => s.isDeleted).map((s) => s.specialtyId);

			if (deletedSpecialtyIds.length > 0) {
				await tx.doctorSpecialty.deleteMany({
					where: {
						doctorId: id,
						specialtyId: { in: deletedSpecialtyIds },
					},
				});
			}

			// add new specialties
			const newSpecialties = specialties.filter((s) => !s.isDeleted);

			for (const item of newSpecialties) {
				await tx.doctorSpecialty.upsert({
					where: {
						doctorId_specialtyId: {
							doctorId: id,
							specialtyId: item.specialtyId,
						},
					},
					create: {
						doctorId: id,
						specialtyId: item.specialtyId,
					},
					update: {},
				});
			}
		}
	});

	// return updated doctor with relations
	const updatedDoctor = await prisma.doctor.findUnique({
		where: { id },
		include: {
			user: true,
			specialties: {
				include: {
					specialty: true,
				},
			},
		},
	});

	return updatedDoctor;
};

export const DoctorService = {
	getDoctors,
	getSingleDoctor,
	updateDoctor,
};
