import { Router } from "express";
import {
  createApplicationController,
  deleteApplicationController,
  getApplicationByIdController,
  getApplicationTrendsController,
  getEmployerApplicantsDetailsController,
  getInternApplicationsDetailsController,
  listApplicationsController,
  updateApplicationController,
} from "../../controller/client/application.controller";
import {
  employerVerification,
  internVerification,
} from "../../middleware/AuthenticateUser";

const router = Router();

// The order of the routes matter

router.get("/personal", internVerification, listApplicationsController);
router.get(
  "/statistic-trends",
  employerVerification,
  getApplicationTrendsController
);
router.get(
  "/get-employer-applicants",
  employerVerification,
  getEmployerApplicantsDetailsController
);
router.get(
  "/get-intern-applications",
  internVerification,
  getInternApplicationsDetailsController
);

// Public listing, supports filters via query
router.get("", listApplicationsController);

// Get by id (public for now)
router.get("/:id", getApplicationByIdController);

// Intern-protected routes
router.post("", internVerification, createApplicationController);
router.delete("/:id", internVerification, deleteApplicationController);

// Employer-protected status update
router.patch("/:id", employerVerification, updateApplicationController);

export default router;
