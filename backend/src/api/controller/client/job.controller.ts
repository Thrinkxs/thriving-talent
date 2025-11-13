import { Request, Response, NextFunction } from "express";
import { ExtendedRequest, IJobFilter } from "../../../utils/Interface";
import { JobService } from "../../services/client/Job.Service";

const jobService = new JobService();

export const createJobController = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.employer!;
  const payload = req.body;
  try {
    const response = await jobService.createJob(account, payload);
    return res.status(201).json({
      message: "Job created successfully",
      newJobData: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getPersonalJobs = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const account = req.employer!;
  const filter = req.query as IJobFilter;
  try {
    const response = await jobService.getPersonalJobs(account, filter);
    return res.status(200).json({
      message: "Personal jobs retrieved successfully",
      personalJobsData: response,
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
  const account = req.employer!;
  const payload = req.body;
  try {
    const response = await jobService.updateJob(account, payload);
    return res.status(200).json({
      message: "Job updated successfully",
      updatedJobData: response,
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
  const account = req.employer!;
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
      jobsData: response,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getEmployerJobMetrics = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    const employer = req.employer!;
    const metrics = await jobService.getEmployerJobMetrics(employer);

    res.status(200).json({
      message: "Jobs metrics retrieved successfully",
      employerJobMetricsData: metrics,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
