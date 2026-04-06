import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";

export interface IRegisterPatientPayload {
	name: string;
	email: string;
	password: string;
}

export interface ILoginPatientPayload {
	email: string;
	password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
	const { name, email, password } = payload;
	const data = await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
		},
	});

	if (!data.user) {
		throw new Error("Failed to register new patient");
	}
	return data;
};

const loginPatient = async (payload: ILoginPatientPayload) => {
	const { email, password } = payload;

	const data = await auth.api.signInEmail({
		body: {
			email,
			password,
		},
	});

	if (data.user.status === UserStatus.BLOCKED) {
		throw new Error("User is blocked");
	}

	if (data.user.deletedAt || data.user.status === UserStatus.DELETED) {
		throw new Error("User is deleted");
	}

	return data;
};

export const AuthService = {
	registerPatient,
	loginPatient,
};
