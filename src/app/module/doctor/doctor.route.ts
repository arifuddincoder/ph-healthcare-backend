import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorSchema } from "./doctor.validation";

const router = Router();

router.get("/", DoctorController.getDoctors);
router.get("/:id", DoctorController.getSingleDoctor);
router.patch("/:id", validateRequest(updateDoctorSchema), DoctorController.updateDoctor);

export const DoctorRoutes = router;
