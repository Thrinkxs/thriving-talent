import { Request, Response, NextFunction } from "express";
import { InternService } from "../../services/client/Intern.Service";
import { ExtendedRequest } from "../../../utils/Interface";

const internService = new InternService();

export const getProfileController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const intern = req.intern!;
  try {
    const response = await internService.getProfile(intern);
    return res.status(200).json({
      message: "Intern profile retrieved successfully",
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
  const intern = req.intern!;
  const payload = req.body;
  try {
    const response = await internService.updateProfile(intern, payload);
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
  const intern = req.intern!;
  const payload = req.body;
  try {
    const response = await internService.updatePassword(intern, payload);
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
  const intern = req.intern!;
  try {
    const response = await internService.deleteProfile(intern);
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
