import { Router } from "express";
import employerAuthenticationRouter from "./employer.authentication.route";
import employerRouter from "./employer.route";

const router = Router();

router.use("/employer/auth", employerAuthenticationRouter);
router.use("/employer", employerRouter);

export default router;
