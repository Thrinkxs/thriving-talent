import { Request, Response, NextFunction } from "express";
import { InternService } from "../../services/client/Intern.Service";
import { ExtendedRequest, IInternFilter } from "../../../utils/Interface";

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
    console.log("Payload received in controller joe joe:", payload);
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

export const getInternByIdController = async (req: Request, res: Response) => {
  const businessId = req.params.internId;
  try {
    const intern = await internService.getInternById(businessId);
    res.status(200).json({
      message: "intern fetched successfully",
      internData: intern,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllInternsController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const filter = req.query as IInternFilter;
  try {
    const response = await internService.getAllInterns(filter);
    return res.status(200).json({
      message: "All interns retrieved successfully",
      internsData: response,
    });
  } catch (error: any) {
    next(error);
  }
};
