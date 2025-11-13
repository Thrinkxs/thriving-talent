import { Router } from "express";
import { internVerification } from "../../middleware/AuthenticateUser";
import {
  deleteProfileController,
  getInternByIdController,
  getProfileController,
  updatePasswordController,
  updateProfileController,
} from "../../controller/client/intern.controller";

const router = Router();

router.get("/:internId", getInternByIdController);

router.use(internVerification);
router
  .route("/profile")
  .get(getProfileController)
  .patch(updateProfileController)
  .delete(deleteProfileController);

router.patch("/password", updatePasswordController);

export default router;
