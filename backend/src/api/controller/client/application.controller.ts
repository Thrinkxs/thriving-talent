import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../../../utils/Interface";
import { ApplicationService } from "../../services/client/Application.Service";

const applicationService = new ApplicationService();

export const createApplicationController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId, internId } = req.body;
    const effectiveInternId = internId || req.intern?.id;

    const response = await applicationService.create({
      jobId,
      internId: effectiveInternId,
    });

    return res
      .status(201)
      .json({ message: "Application created successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const getApplicationByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as any;
    const response = await applicationService.getById(id);
    return res
      .status(200)
      .json({ message: "Application retrieved successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const listApplicationsController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId, internId, status, page, limit } = req.query as any;
    const effectiveInternId = internId || req.intern?.id;

    const response = await applicationService.list({
      jobId,
      internId: effectiveInternId,
      status,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    return res
      .status(200)
      .json({ message: "Applications retrieved successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const updateApplicationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as any;
    const payload = req.body;
    const response = await applicationService.update(id, payload);
    return res
      .status(200)
      .json({ message: "Application updated successfully", data: response });
  } catch (error: any) {
    next(error);
  }
};

export const deleteApplicationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as any;
    await applicationService.delete(id);
    return res
      .status(200)
      .json({ message: "Application deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
