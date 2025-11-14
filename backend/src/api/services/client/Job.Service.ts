import AppError from "../../../utils/AppError";
import { IJobFilter } from "../../../utils/Interface";
import {
  paginateModel,
  paginateModelWithPopulate,
} from "../../../utils/Pagination.Helper";
import { Application } from "../../models/Application";
import { IEmployer } from "../../models/Employer";
import { IIntern } from "../../models/Intern";
import { Job } from "../../models/Job";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

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
    const { jobID, companyID, search, type, status, page, limit } = filter;
    const query: any = {};

    if (jobID) {
      query._id = jobID;
    }
    if (companyID) {
      query.company = companyID;
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
    if (type) {
      query.type = type;
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

  public async getEmployerJobMetrics(employer: IEmployer) {
    const now = new Date();

    // Define date ranges
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const prevMonthStart = startOfMonth(subMonths(now, 1));
    const prevMonthEnd = endOfMonth(subMonths(now, 1));

    // 1️⃣ Get jobs for this employer
    const jobIds = await Job.find({ company: employer._id }).distinct("_id");

    // 2️⃣ Current totals
    const [currentJobs, currentApplications] = await Promise.all([
      Job.countDocuments({
        company: employer._id,
        createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
      }),
      jobIds.length
        ? Application.countDocuments({
            job: { $in: jobIds },
            createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
          })
        : 0,
    ]);

    // 3️⃣ Previous totals
    const [previousJobs, previousApplications] = await Promise.all([
      Job.countDocuments({
        company: employer._id,
        createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd },
      }),
      jobIds.length
        ? Application.countDocuments({
            job: { $in: jobIds },
            createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd },
          })
        : 0,
    ]);

    // 4️⃣ Percentage change helper
    const calcChange = (current: number, prev: number) => {
      if (prev === 0) return current > 0 ? 100 : 0;
      return Number((((current - prev) / prev) * 100).toFixed(2));
    };

    // 5️⃣ Job type breakdown for current month
    const typeCounts = await Job.aggregate([
      {
        $match: {
          company: employer._id,
          createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    const prevTypeCounts = await Job.aggregate([
      {
        $match: {
          company: employer._id,
          createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd },
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    // Helper to extract and compute percentage
    const getTypeStats = (type: string) => {
      const current = typeCounts.find((t) => t._id === type)?.count || 0;
      const previous = prevTypeCounts.find((t) => t._id === type)?.count || 0;
      return {
        count: current,
        change: calcChange(current, previous),
      };
    };

    // 6️⃣ Construct full response
    return {
      totalJobs: {
        count: currentJobs,
        change: calcChange(currentJobs, previousJobs),
      },
      totalApplicants: {
        count: currentApplications,
        change: calcChange(currentApplications, previousApplications),
      },
      jobTypeStats: {
        fullTime: getTypeStats("full-time"),
        partTime: getTypeStats("part-time"),
        negotiable: getTypeStats("negotiable"),
      },
    };
  }

  /**
   * GetInternJobMetrics below
   * metrics for intern
   **/

  public async getInternJobMetrics(intern: IIntern) {
    const now = new Date();

    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const prevMonthStart = startOfMonth(subMonths(now, 1));
    const prevMonthEnd = endOfMonth(subMonths(now, 1));

    const allApplications = await Application.find({
      intern: intern._id,
    }).populate("job");

    const currentApps = allApplications.filter((app) => {
      const createdAt = (app as any).createdAt as Date;
      return createdAt >= currentMonthStart && createdAt <= currentMonthEnd;
    });

    const prevApps = allApplications.filter((app) => {
      const createdAt = (app as any).createdAt as Date;
      return createdAt >= prevMonthStart && createdAt <= prevMonthEnd;
    });

    // Active apps (pending)
    const currentActive = currentApps.filter((app) => app.status === "pending");
    const previousActive = prevApps.filter((app) => app.status === "pending");

    // Job type breakdown
    const jobTypes = ["full-time", "part-time", "negotiable"];
    const jobTypeStats: any = {};

    jobTypes.forEach((type) => {
      const currentCount = currentApps.filter(
        (app) => (app.job as any)?.type === type
      ).length;
      const previousCount = prevApps.filter(
        (app) => (app.job as any)?.type === type
      ).length;

      jobTypeStats[type.replace("-", "")] = {
        count: currentCount,
        change: calcChange(currentCount, previousCount),
      };
    });

    function calcChange(current: number, prev: number) {
      if (prev === 0) return current > 0 ? 100 : 0;
      return Number((((current - prev) / prev) * 100).toFixed(2));
    }

    return {
      totalApplicationsSent: {
        count: currentApps.length,
        change: calcChange(currentApps.length, prevApps.length),
      },
      activeApplications: {
        count: currentActive.length,
        change: calcChange(currentActive.length, previousActive.length),
      },
      jobTypeStats,
    };
  }
}
