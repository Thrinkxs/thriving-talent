import { Router } from "express";
import {
  createApplicationController,
  deleteApplicationController,
  getApplicationByIdController,
  listApplicationsController,
  updateApplicationController,
} from "../../controller/client/application.controller";
import {
  employerVerification,
  internVerification,
} from "../../middleware/AuthenticateUser";

const router = Router();

// Public listing, supports filters via query
router.get("", listApplicationsController);

// Get by id (public for now)
router.get("/:id", getApplicationByIdController);

// Intern-protected routes
router.post("", internVerification, createApplicationController);
router.get("/personal", internVerification, listApplicationsController);
router.delete("/:id", internVerification, deleteApplicationController);

// Employer-protected status update
router.patch(
  "/:id",
  employerVerification,
  updateApplicationController
);

export default router;


