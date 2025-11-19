import { console } from "inspector";
import AppError from "../../../utils/AppError";
import { Hasher } from "../../../utils/HashPassword";
import { IIntern, Intern } from "../../models/Intern";
import { IInternFilter } from "../../../utils/Interface";
import { paginateModelWithPopulate } from "../../../utils/Pagination.Helper";

export class InternService {
  private hasher: Hasher;
  constructor() {
    this.hasher = new Hasher();
  }

  public async getProfile(intern: IIntern) {
    return intern;
  }

  // public async updateProfile(intern: IIntern, payload: Partial<IIntern>) {
  //   Object.keys(payload).forEach((key) => {
  //     if (payload[key] !== undefined) {
  //       (intern as any)[key] = payload[key];
  //     }
  //   });

  //   return await intern.save();
  // }

  public async updateProfile(intern: IIntern, payload: Partial<IIntern>) {
    try {
      const updatedIntern = await Intern.findByIdAndUpdate(
        intern._id,
        payload,
        {
          new: true,
        }
      );
      if (!updatedIntern) {
        throw new Error("Intern does not exist");
      }
      return updatedIntern;
    } catch (error: any) {
      throw new Error("Error updating intern profile");
    }
  }

  public async updatePassword(
    intern: IIntern,
    payload: { currentPassword: string; password: string }
  ) {
    const { currentPassword, password } = payload;
    const isValid = this.hasher.verifyPassword(
      currentPassword,
      intern.password!
    );

    console.log("Is valid password:", isValid);

    if (!isValid) {
      throw new AppError(401, "Invalid password");
    }

    intern.password = await this.hasher.hashPassword(password);
    return await intern.save();
  }

  public async deleteProfile(intern: IIntern) {
    intern.isDeleted = true;
    await intern.save();
    return;
  }

  public async getInternById(businessId: string) {
    try {
      const business = await Intern.findById(businessId);
      if (!business) {
        throw new Error("Intern does not exist");
      }
      return business;
    } catch (error: any) {
      throw new Error("Error getting intern");
    }
  }

  public async getAllInterns(filter: IInternFilter) {
    const { address, gender, search, status, page, limit } = filter;

    const query: any = {
      isDeleted: { $ne: true }, // exclude soft-deleted interns
    };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { gender: { $regex: search, $options: "i" } },
      ];
    }

    if (address) {
      query.address = { $regex: address, $options: "i" };
    }

    if (gender) {
      query.gender = gender;
    }

    if (status) {
      query.status = status;
    }

    const interns = await paginateModelWithPopulate(
      Intern,
      query,
      parseInt(page || "1", 10),
      parseInt(limit || "10", 10),
      { createdAt: -1 },
      null,
      "-password -__v"
    );

    return interns;
  }
}
