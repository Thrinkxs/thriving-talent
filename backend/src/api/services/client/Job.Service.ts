import AppError from "../../../utils/AppError";
import { IJobFilter } from "../../../utils/Interface";
import {
  paginateModel,
  paginateModelWithPopulate,
} from "../../../utils/Pagination.Helper";
import { IEmployer } from "../../models/Employer";
import { Job } from "../../models/Job";

export class JobService {
  public async createJob(
    employer: IEmployer,
    payload: {
      title: string;
      description: string;
      location: string;
      type: string;
    }
  ) {
    const { title, description, location, type } = payload;
    const job = await Job.create({
      title,
      description,
      company: employer._id,
      location,
      type,
    });

    return job;
  }

  public async getPersonalJobs(employer: IEmployer, filter: IJobFilter) {
    const { jobID, search, status, page, limit } = filter;
    const query: any = { company: employer._id };

    if (jobID) {
      query._id = jobID;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const jobs = await paginateModel(
      Job,
      query,
      parseInt(page || "1", 10),
      parseInt(limit || "10", 10)
    );

    return jobs;
  }

  public async updateJob(
    employer: IEmployer,
    payload: {
      jobID: string;
      title?: string;
      description?: string;
      location?: string;
      status?: string;
    }
  ) {
    const { jobID, title, description, location, status } = payload;
    const job = await Job.findOne({ _id: jobID, company: employer._id });
    if (!job) {
      throw new AppError(404, "Job not found");
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.status = status || job.status;

    return await job.save();
  }

  public async deleteJob(employer: IEmployer, jobID: string) {
    const job = await Job.findOneAndDelete({
      _id: jobID,
      company: employer._id,
    });
    if (!job) {
      throw new AppError(404, "Job not found");
    }

    return;
  }

  public async getJobs(filter: IJobFilter) {
    const { jobID, search, status, page, limit } = filter;
    const query: any = {};

    if (jobID) {
      query._id = jobID;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const jobs = await paginateModelWithPopulate(
      Job,
      query,
      parseInt(page || "1", 10),
      parseInt(limit || "10", 10),
      { createdAt: -1 },
      { path: "company", select: "fullName companyName images email" }
    );

    return jobs;
  }
}
