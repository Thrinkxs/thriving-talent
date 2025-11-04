import { Router } from "express";
import { employerVerification } from "../../middleware/AuthenticateUser";
import {
  getJobsController,
  createJobController,
  getPersonalJobs,
  updateJobController,
  deleteJobController,
} from "../../controller/client/job.controller";

const router = Router();

router.get("", getJobsController);

router.use(employerVerification);
router
  .route("/personal")
  .post(createJobController)
  .get(getPersonalJobs)
  .patch(updateJobController)
  .delete(deleteJobController);

export default router;
