import AppError from "../../../utils/AppError";
import { Hasher } from "../../../utils/HashPassword";
import { IIntern } from "../../models/Intern";

export class InternService {
  private hasher: Hasher;
  constructor() {
    this.hasher = new Hasher();
  }

  public async getProfile(intern: IIntern) {
    return intern;
  }

  public async updateProfile(intern: IIntern, payload: Partial<IIntern>) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined) {
        (intern as any)[key] = payload[key];
      }
    });

    return await intern.save();
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
}
