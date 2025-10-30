import { Router } from "express";
import { employerVerification } from "../../middleware/AuthenticateUser";
import {
  deleteProfileController,
  getProfileController,
  updatePasswordController,
  updateProfileController,
} from "../../controller/client/employer.controller";

const router = Router();

router.use(employerVerification);
router
  .route("/profile")
  .get(getProfileController)
  .patch(updateProfileController)
  .delete(deleteProfileController);

router.patch("/password", updatePasswordController);

export default router;
