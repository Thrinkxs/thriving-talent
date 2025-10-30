import { Intern, IIntern } from "../../models/Intern";
import AppError from "../../../utils/AppError";
import { Hasher } from "../../../utils/HashPassword";
import { CacheService } from "../Cache.Service";
import { EmailService } from "../Email.Service";
import { AuthenticationTokenGenerator } from "../Unique.Service";
import { v4 as uuidv4 } from "uuid";

export class AuthenticationService {
  private authenticationTokenGenerator: AuthenticationTokenGenerator;
  private cacheService: CacheService;
  private emailService: EmailService;
  private hasher: Hasher;

  constructor(
    authenticationTokenGenerator: AuthenticationTokenGenerator,
    cacheService: CacheService,
    emailService: EmailService,
    hasher: Hasher
  ) {
    this.authenticationTokenGenerator = authenticationTokenGenerator;
    this.cacheService = cacheService;
    this.emailService = emailService;
    this.hasher = hasher;
  }

  public async registerAccount(payload: any) {
    payload.email = payload.email.toLowerCase();
    const { email, password } = payload;
    const accountExistence = await this.checkAccountExistence(email);
    if (accountExistence) {
      throw new AppError(409, "Intern already exist");
    }
    payload.password = await this.hasher.hashPassword(password);
    // payload.referralCode = uuidv4().slice(0, 10).toLowerCase();

    const intern = await Intern.create(payload);

    await this.sendVerificationEmail({ email: intern.email });
    const { accessToken, refreshToken } = await this.getAuthorizationToken(
      intern.id
    );

    return { intern, accessToken, refreshToken };
  }

  public async loginAccount(payload: any) {
    const { email, password } = payload;
    const intern = await this.checkAccountExistence(email.toLowerCase());
    if (!intern) {
      throw new AppError(401, "Invalid email or password");
    }
    const isMatch = await this.hasher.verifyPassword(
      password,
      intern.password!
    );
    if (!isMatch) {
      throw new AppError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await this.getAuthorizationToken(
      intern.id
    );
    return { intern, accessToken, refreshToken };
  }

  // public async socialLogin(payload: any) {
  //   const { email, firstname, lastname } = payload;
  //   let intern = await this.checkAccountExistence(email.toLowerCase());
  //   if (!intern) {
  //     intern = await Intern.create({
  //       email,
  //       firstname,
  //       lastname,
  //       isVerified: true,
  //     });
  //   }

  //   const { accessToken, refreshToken } = await this.getAuthorizationToken(
  //     intern.id
  //   );
  //   await intern.save();
  //   return { intern, accessToken, refreshToken };
  // }

  public async sendVerificationEmail(filter: any) {
    const { email } = filter;
    const otp = this.authenticationTokenGenerator.generateOTP(6);
    await this.cacheService.cacheVerificationOTP(email, otp);

    await this.emailService.sendVerificationEmail({ email, otp });
    return;
  }

  public async verifyAccount(payload: any) {
    const { email, verificationCode } = payload;
    const cachedVeificaitonCode =
      await this.cacheService.getCachedVerificationOTP(email);
    if (cachedVeificaitonCode !== verificationCode) {
      throw new AppError(401, "Invalid verification code");
    }

    let intern = await this.checkAccountExistence(email.toLowerCase());
    if (!intern) {
      throw new AppError(404, "Intern not found");
    }

    intern.isVerified = true;
    intern = await intern.save();
    return intern;
  }

  public async forgotPassword(payload: any) {
    const { email } = payload;

    let account = await this.checkAccountExistence(email.toLowerCase());
    if (!account) {
      throw new AppError(404, "Intern not found");
    }

    const otp = await this.getPasswordResetOTP(email);

    await this.emailService.sendPasswordResetOTP({ email, otp });
    return;
  }

  public async verifyPasswordResetOTP(payload: any) {
    const { email, otp } = payload;
    let intern = await this.checkAccountExistence(email.toLowerCase());
    if (!intern) {
      throw new AppError(404, "Intern not found");
    }
    let cachedResponse = await this.cacheService.getCachedPasswordResetOTP(
      intern.email
    );

    let cachedResponseJSON = JSON.parse(cachedResponse);

    if (cachedResponseJSON.otp != otp) {
      throw new AppError(400, "Invalid OTP");
    }
    cachedResponseJSON.isOTPValid = true;
    await this.cacheService.cachePasswordResetOTP(
      intern.email,
      JSON.stringify(cachedResponseJSON)
    );
    return;
  }

  public async resetPassword(payload: any) {
    const { email, password, otp } = payload;
    let account = await this.checkAccountExistence(email.toLowerCase());
    if (!account) {
      throw new AppError(404, "Account not found");
    }

    const cachedResponseJSON =
      await this.cacheService.getCachedPasswordResetOTP(email);

    if (JSON.parse(cachedResponseJSON).isOTPValid === false) {
      throw new AppError(401, "Invalid OTP");
    }
    account.password = await this.hasher.hashPassword(password);
    account = await account.save();

    await this.cacheService.deleteCachedPasswordResetOTP(email);
    return account;
  }

  public async getAccessToken(filter: any) {
    const { refreshToken } = filter;
    const cachedAccountID = await this.cacheService.getAuthorizationToken(
      refreshToken
    );
    if (!cachedAccountID) {
      throw new AppError(401, "Invalid refresh token");
    }
    const intern = await Intern.findOne({
      _id: cachedAccountID,
      isDeleted: false,
    });
    if (!intern) throw new AppError(404, "Intern not found");
    const accessToken = this.authenticationTokenGenerator.generateToken({
      id: intern.id,
    });

    return { accessToken };
  }

  public async logoutAccount(refreshToken: string) {
    await this.cacheService.deleteCachedData(refreshToken);
    return;
  }

  private async checkAccountExistence(email: string) {
    const intern = await Intern.findOne({
      email,
      isDeleted: false,
    });
    return intern;
  }

  private async getAuthorizationToken(accountID: string) {
    const authenticationTokenGenerator = this.authenticationTokenGenerator;
    const accessToken = authenticationTokenGenerator.generateToken({
      id: accountID,
    });
    const refreshToken = authenticationTokenGenerator.generateRefreshToken({
      id: accountID,
    });

    await this.cacheService.cacheAuthorizationToken(accountID, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async getPasswordResetOTP(email: string) {
    const otp = this.authenticationTokenGenerator.generateOTP(6);
    await this.cacheService.cachePasswordResetOTP(email, otp);
    return otp;
  }

  private generateReferralCode() {
    const uniqueID = uuidv4();
    const userID = uniqueID.slice(0, 10);
    return userID.toLowerCase();
  }
}
