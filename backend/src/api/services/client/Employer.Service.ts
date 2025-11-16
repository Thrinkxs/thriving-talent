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

  public async updateProfile(employer: IEmployer, payload: Partial<IEmployer>) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined) {
        (employer as any)[key] = payload[key];
      }
    });

    return await employer.save();
  }

  public async updatePassword(
    employer: IEmployer,
    payload: { currentPassword: string; password: string }
  ) {
    const { currentPassword, password } = payload;
    const isValid = await this.hasher.verifyPassword(
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
