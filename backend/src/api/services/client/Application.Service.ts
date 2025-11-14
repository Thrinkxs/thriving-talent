import AppError from "../../../utils/AppError";
import { Application, IApplication } from "../../models/Application";
import { IJob, Job } from "../../models/Job";
import { IIntern, Intern } from "../../models/Intern";
import { paginateModelWithPopulate } from "../../../utils/Pagination.Helper";
import { Types } from "mongoose";

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
    if (!intern || intern.isDeleted)
      throw new AppError(404, "Intern not found");

    const existing = await Application.findOne({
      job: jobId,
      intern: internId,
    });
    if (existing) throw new AppError(409, "You already applied to this job");

    const application = await Application.create({
      job: jobId,
      intern: internId,
    });

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
      [{ path: "job" }, { path: "intern", select: "-password" }],
      "-__v"
    );
  }

  public async update(
    applicationId: string,
    payload: UpdateApplicationPayload
  ) {
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

  public async getApplicationTrends(employerId: string) {
    // Fetch jobs belonging to this employer
    const jobIds = await Job.find({ company: employerId }).distinct("_id");

    if (!jobIds || jobIds.length === 0) {
      return {
        daily: [],
        weekly: [],
        monthly: [],
      };
    }

    const matchStage = { job: { $in: jobIds } };

    const dailyAggregation = [
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      // { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      { $sort: { "_id.year": 1 as 1, "_id.month": 1 as 1, "_id.day": 1 as 1 } },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          count: 1,
        },
      },
    ];

    const weeklyAggregation = [
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $isoWeekYear: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 as 1, "_id.week": 1 as 1 } },
      {
        $project: {
          _id: 0,
          week: {
            $concat: [
              { $toString: "$_id.year" },
              "-W",
              { $toString: "$_id.week" },
            ],
          },
          count: 1,
        },
      },
    ];

    const monthlyAggregation = [
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 as 1, "_id.month": 1 as 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          count: 1,
        },
      },
    ];

    const [daily, weekly, monthly] = await Promise.all([
      Application.aggregate(dailyAggregation),
      Application.aggregate(weeklyAggregation),
      Application.aggregate(monthlyAggregation),
    ]);

    return { daily, weekly, monthly };
  }

  /**
   * Get all applicants that applied to jobs posted by the employer
   */
  public async getEmployerApplicantDetails(employerId: string) {
    // ✅ Fetch jobs that belong to this employer
    const jobs = await Job.find({ company: employerId }).select(
      "_id title location type description"
    );

    if (jobs.length === 0) {
      return [];
    }

    const jobIds = jobs.map((j) => j._id);

    // ✅ Use `lean()` for cleaner plain objects and performance
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate<{
        intern: Pick<
          IIntern,
          | "_id"
          | "fullName"
          | "email"
          | "phone"
          | "gender"
          | "profileImage"
          | "resume"
          | "introVideo"
        >;
        job: Pick<IJob, "title" | "location" | "type" | "description">;
      }>({
        path: "intern",
        select:
          "_id fullName email phone gender profileImage resume introVideo",
      })
      .populate({
        path: "job",
        select: "title location type description",
      })
      .sort({ createdAt: -1 })
      .lean<
        {
          _id: string;
          status: IApplication["status"];
          createdAt: Date;
          updatedAt: Date;
          intern: IIntern;
          job: IJob;
        }[]
      >(); // 👈 tell TS the shape explicitly (includes timestamps)

    // ✅ Format the response data
    return applications.map((app) => {
      const intern = app.intern as IIntern | null;
      const job = app.job as IJob | null;

      return {
        applicantId: intern?._id ?? null, // ✅ applicant ID
        applicantName: intern?.fullName ?? "N/A",
        applicantEmail: intern?.email ?? "N/A",
        applicantPhone: intern?.phone ?? "N/A",
        applicantGender: intern?.gender ?? "N/A",
        applicantResume: intern?.resume ?? null,
        applicantProfileImage: intern?.profileImage ?? null,
        applicantIntroVideo: intern?.introVideo ?? null,

        jobTitle: job?.title ?? "N/A",
        jobLocation: job?.location ?? "N/A",
        jobType: job?.type ?? "N/A",
        jobDescription: job?.description ?? "N/A",

        status: app.status,
        appliedAt: app.createdAt ?? null, // ✅ applied date
      };
    });
  }

  /**
   * Gets information about the jobs that the applicants applied to
   **/

  public async getInternApplicationDetails(internId: string) {
    const applications = await Application.find({ intern: internId })
      .populate({
        path: "job",
        select: "_id title location type description company",
        populate: {
          path: "company",
          model: "Employer",
          select: "_id fullName companyName email images",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    return applications.map((app: any) => {
      const job = app.job as any;
      const company = job?.company as any;

      return {
        applicationId: app._id,
        appliedAt: app.createdAt,
        status: app.status,

        jobId: job?._id ?? null,
        jobTitle: job?.title ?? "N/A",
        jobLocation: job?.location ?? "N/A",
        jobType: job?.type ?? "N/A",
        jobDescription: job?.description ?? "N/A",

        companyId: company?._id ?? null,
        employerName: company?.fullName ?? "N/A",
        companyName: company?.companyName ?? "N/A",
        companyEmail: company?.email ?? "N/A",
        companyImages: company?.images ?? [],
      };
    });
  }
}
