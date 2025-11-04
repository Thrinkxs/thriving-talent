import { Router } from "express";
import employerAuthenticationRoute from "./employer.authentication.route";
import employerRoute from "./employer.route";
import internRoute from "./intern.route";
import internAuthenticationRoute from "./intern.authentication.route";
import jobRoute from "./job.route";
import applicationRoute from "./application.route";

const router = Router();

router.use("/employer/auth", employerAuthenticationRoute);
router.use("/employer", employerRoute);
router.use("/intern/auth", internAuthenticationRoute);
router.use("/intern", internRoute);
router.use("/job", jobRoute);
router.use("/application", applicationRoute);

export default router;
