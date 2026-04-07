export interface TSpecialtyPayload {
	specialtyId: string;
	isDeleted?: boolean;
}

export interface TUpdateDoctorPayload {
	name?: string;
	profilePhoto?: string;
	contactNumber?: string;
	address?: string;
	registrationNumber?: string;
	experience?: number;
	gender?: "MALE" | "FEMALE";
	appointmentFee?: number;
	qualification?: string;
	currentWorkingPlace?: string;
	designation?: string;
	specialties?: TSpecialtyPayload[];
}
