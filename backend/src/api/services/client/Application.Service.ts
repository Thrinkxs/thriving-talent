import AppError from "../../../utils/AppError";
import { Application, IApplication } from "../../models/Application";
import { Job } from "../../models/Job";
import { Intern } from "../../models/Intern";
import {
  paginateModelWithPopulate,
} from "../../../utils/Pagination.Helper";

type CreateApplicationPayload = {
  jobId: string;
  internId: string;
};

type ListApplicationsFilter = {
  jobId?: string;
  internId?: string;
  status?: IApplication["status"];
  page?: number;
  limit?: number;
};

type UpdateApplicationPayload = Partial<Pick<IApplication, "status">>;

export class ApplicationService {
  public async create(payload: CreateApplicationPayload) {
    const { jobId, internId } = payload;

    const [job, intern] = await Promise.all([
      Job.findById(jobId),
      Intern.findById(internId),
    ]);

    if (!job) throw new AppError(404, "Job not found");
    if (!intern || intern.isDeleted) throw new AppError(404, "Intern not found");

    const existing = await Application.findOne({ job: jobId, intern: internId });
    if (existing) throw new AppError(409, "You already applied to this job");

    const application = await Application.create({ job: jobId, intern: internId });

    return application
      .populate([{ path: "job" }, { path: "intern", select: "-password" }])
      .then((doc) => doc);
  }

  public async getById(applicationId: string) {
    const application = await Application.findById(applicationId)
      .populate([{ path: "job" }, { path: "intern", select: "-password" }])
      .select("-__v");
    if (!application) throw new AppError(404, "Application not found");
    return application;
  }

  public async list(filter: ListApplicationsFilter = {}) {
    const { jobId, internId, status, page = 1, limit = 10 } = filter;

    const query: Record<string, any> = {};
    if (jobId) query.job = jobId;
    if (internId) query.intern = internId;
    if (status) query.status = status;

    return await paginateModelWithPopulate(
      Application,
      query,
      page,
      limit,
      { createdAt: -1 },
      [
        { path: "job" },
        { path: "intern", select: "-password" },
      ],
      "-__v"
    );
  }

  public async update(applicationId: string, payload: UpdateApplicationPayload) {
    const application = await Application.findById(applicationId);
    if (!application) throw new AppError(404, "Application not found");

    if (payload.status) application.status = payload.status;

    await application.save();

    return application
      .populate([{ path: "job" }, { path: "intern", select: "-password" }])
      .then((doc) => doc);
  }

  public async delete(applicationId: string) {
    const application = await Application.findById(applicationId);
    if (!application) throw new AppError(404, "Application not found");
    await application.deleteOne();
    return;
  }
}


