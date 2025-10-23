import { Request, Response, NextFunction } from "express";
import { ExtendedRequest, IJobFilter } from "../../../utils/Interface";
import { JobService } from "../../services/client/Job.Service";

const jobService = new JobService();

export const createJobController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  const payload = req.body;
  try {
    const response = await jobService.createJob(account, payload);
    return res.status(200).json({
      message: "Job created successfully",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getJobController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  const filter = req.query as IJobFilter;
  try {
    const response = await jobService.getPersonalJobs(account, filter);
    return res.status(200).json({
      message: "Personal jobs retrieved successfully",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateJobController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  const payload = req.body;
  try {
    const response = await jobService.updateJob(account, payload);
    return res.status(200).json({
      message: "Job updated successfully",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteJobController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.account!;
  const { jobID } = req.query as { jobID: string };
  try {
    await jobService.deleteJob(account, jobID);
    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

export const getJobsController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const filter = req.query as IJobFilter;
  try {
    const response = await jobService.getJobs(filter);
    return res.status(200).json({
      message: "Jobs retrieved successfully",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};
