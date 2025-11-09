import { Router } from "express";
import { internVerification } from "../../middleware/AuthenticateUser";
import {
  deleteProfileController,
  getProfileController,
  updatePasswordController,
  updateProfileController,
} from "../../controller/client/intern.controller";

const router = Router();

router.use(internVerification);
router
  .route("/profile")
  .get(getProfileController)
  .patch(updateProfileController)
  .delete(deleteProfileController);

router.patch("/password", updatePasswordController);

export default router;
