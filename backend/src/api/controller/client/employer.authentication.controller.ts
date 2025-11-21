import { NextFunction, Request, Response } from "express";
import { CacheService } from "../../services/Cache.Service";
import { EmailService } from "../../services/Email.Service";
import { AuthenticationTokenGenerator } from "../../services/Unique.Service";
import { Hasher } from "../../../utils/HashPassword";
import { AuthenticationService } from "../../services/client/EmployerAuthentication.Service";

const hasher = new Hasher();
const cacheService = new CacheService();
const authenticationTokenGenerator = new AuthenticationTokenGenerator();
const emailService = new EmailService();

const authenticationService = new AuthenticationService(
  authenticationTokenGenerator,
  cacheService,
  emailService,
  hasher
);
export const registerAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const response = await authenticationService.registerAccount(payload);
    const { accessToken, refreshToken } = response;

    res.cookie("access-token", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refresh-token", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(201)
      .json({ message: "Registration successful", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const loginAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const response = await authenticationService.loginAccount(payload);
    const { accessToken, refreshToken } = response;

    res.cookie("access-token", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refresh-token", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const sendVerificationEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filter = req.query;
  try {
    const response = await authenticationService.sendVerificationEmail(filter);
    return res.status(200).json({ message: "Verification email sent" });
  } catch (error: any) {
    next(error);
  }
};

export const verifyAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const response = await authenticationService.verifyAccount(payload);
    return res
      .status(200)
      .json({ message: "Account verified successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const response = await authenticationService.forgotPassword(payload);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error: any) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const response = await authenticationService.resetPassword(payload);
    return res
      .status(200)
      .json({ message: "Password reset successful", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const verifyPasswordResetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const response = await authenticationService.verifyPasswordResetOTP(
      payload
    );
    return res.status(200).json({
      message: "Password Reset OTP Verified",
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAccessTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token found" });
  }

  try {
    const response = await authenticationService.getAccessToken(refreshToken);
    const { accessToken } = response;
    res.cookie("access-token", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    return res.status(200).json({
      message: "Access token fetched successfully",
      data: accessToken,
    });
  } catch (error: any) {
    next(error);
  }
};

export const logoutAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get refresh token from cookies instead of request body
    const refreshToken = req.cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token found" });
    }

    await authenticationService.logoutAccount(refreshToken);
    // Clear the cookies
    res.clearCookie("access-token");
    res.clearCookie("refresh-token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    next(error);
  }
};
