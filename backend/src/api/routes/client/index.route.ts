import { Router } from "express";
import employerAuthenticationRoute from "./employer.authentication.route";
import employerRoute from "./employer.route";
import jobRoute from "./job.route";

const router = Router();

router.use("/employer/auth", employerAuthenticationRoute);
router.use("/employer", employerRoute);
router.use("/job", jobRoute);

export default router;
