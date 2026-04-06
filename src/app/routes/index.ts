import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.router";
import { userRoutes } from "../module/user/user.route";

const router = Router();

router.use("/specialties", SpecialtyRoutes);
router.use("/auth", authRoutes);
router.use("/doctors", userRoutes);

export const IndexRoutes = router;
