import AppError from "../../../utils/AppError";
import { Hasher } from "../../../utils/HashPassword";
import { IEmployer } from "../../models/Employer";

export class EmployerService {
  private hasher: Hasher;
  constructor() {
    this.hasher = new Hasher();
  }

  public async getProfile(employer: IEmployer) {
    return employer;
  }

  public async updateProfile(
    employer: IEmployer,
    payload: {
      fullName?: string;
      companyName?: string;
      description?: string;
      images?: string[];
    }
  ) {
    const { fullName, companyName, description, images } = payload;

    if (fullName) employer.fullName = fullName;
    if (companyName) employer.companyName = companyName;
    if (description) employer.description = description;
    if (images) employer.images = images;

    return await employer.save();
  }

  public async updatePassword(
    employer: IEmployer,
    payload: { currentPassword: string; password: string }
  ) {
    const { currentPassword, password } = payload;
    const isValid = this.hasher.verifyPassword(
      currentPassword,
      employer.password!
    );

    if (!isValid) {
      throw new AppError(401, "Invalid password");
    }

    employer.password = await this.hasher.hashPassword(password);
    return await employer.save();
  }

  public async deleteProfile(employer: IEmployer) {
    employer.isDeleted = true;
    await employer.save();
    return;
  }
}
