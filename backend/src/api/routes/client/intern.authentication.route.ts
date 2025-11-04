import { Router } from "express";
import {
  registerAccountController,
  loginAccountController,
  sendVerificationEmailController,
  verifyAccountController,
  forgotPasswordController,
  verifyPasswordResetController,
  resetPasswordController,
  getAccessTokenController,
  logoutAccountController,
} from "../../controller/client/employer.authentication.controller";

const router = Router();

router.post("/register", registerAccountController);

router.post("/login", loginAccountController);

router.get("/request-verification", sendVerificationEmailController);

router.patch("/verify-account", verifyAccountController);

router.post("/forgot-password", forgotPasswordController);

router.post("/verify-forgot-password-otp", verifyPasswordResetController);

router.patch("/reset-password", resetPasswordController);

router.patch("/access-token", getAccessTokenController);

router.delete("/logout", logoutAccountController);

export default router;
