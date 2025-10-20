import { Request, Response, NextFunction } from "express";
import { EmployerService } from "../../services/client/Employer.Service";
import { ExtendedRequest } from "../../../utils/Interface";

const employerService = new EmployerService();

export const getProfileController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  try {
    const response = await employerService.getProfile(account);
    return res.status(200).json({
      message: "Employer profile retrieved successfully",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateProfileController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  const payload = req.body;
  try {
    const response = await employerService.updateProfile(account, payload);
    return res
      .status(200)
      .json({ message: "Profile updated successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const updatePasswordController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  const payload = req.body;
  try {
    const response = await employerService.updatePassword(account, payload);
    return res
      .status(200)
      .json({ message: "Password updated successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const deleteProfileController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  try {
    const response = await employerService.deleteProfile(account);
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
