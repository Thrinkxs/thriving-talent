import { Router } from "express";
import {
  employerVerification,
  internVerification,
} from "../../middleware/AuthenticateUser";
import {
  getJobsController,
  createJobController,
  getPersonalJobs,
  updateJobController,
  deleteJobController,
  getEmployerJobMetrics,
  getInternJobMetrics,
} from "../../controller/client/job.controller";

const router = Router();

router.get("", getJobsController);

router.get(
  "/employer-dashboard-metrics",
  employerVerification,
  getEmployerJobMetrics
);

router.get(
  "/intern-dashboard-metrics",
  internVerification,
  getInternJobMetrics
);

router.use(employerVerification);
router
  .route("/personal")
  .post(createJobController)
  .get(getPersonalJobs)
  .patch(updateJobController)
  .delete(deleteJobController);

export default router;
