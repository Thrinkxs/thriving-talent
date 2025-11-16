import { redisClient } from "../../config/cache";
import AppError from "../../utils/AppError";

export class CacheService {
  public async cacheVerificationOTP(email: string, verificationCode: string) {
    try {
      email = `email-verification-${email}`;
      await redisClient.setEx(email, 300, verificationCode);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Caching Data: ${error.message}`);
    }
  }

  public async getCachedVerificationOTP(email: string): Promise<string> {
    email = `email-verification-${email.toLowerCase()}`;
    const verificationCode = await redisClient.get(email);
    if (!verificationCode) throw new AppError(404, "Expired OTP");
    return verificationCode as string;
  }

  public async cache2FAOTP(email: string, verificationCode: string) {
    try {
      email = `2FA-${email.toLowerCase()}`;
      await redisClient.setEx(email, 300, verificationCode);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Caching Data: ${error.message}`);
    }
  }

  public async getCached2FAOTP(email: string): Promise<string> {
    email = `2FA-${email.toLowerCase()}`;
    const verificationCode = await redisClient.get(email);
    if (!verificationCode) throw new AppError(404, "Expired OTP");
    return verificationCode as string;
  }

  public async deleteCachedVerificationOTP(email: string) {
    const key = `email-verification-${email.toLowerCase()}`;
    try {
      await redisClient.del(key);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Deleting Cached Data: ${error.message}`);
    }
  }

  public async cachePasswordResetOTP(email: string, otp: string) {
    try {
      email = `password-reset-${email.toLowerCase()}`;
      await redisClient.setEx(email, 900, JSON.stringify({ otp }));
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Caching Data: ${error.message}`);
    }
  }

  public async getCachedPasswordResetOTP(email: string): Promise<string> {
    email = `password-reset-${email.toLowerCase()}`;
    const cacheResponse = await redisClient.get(email);
    if (!cacheResponse) throw new AppError(404, "Expired OTP");
    return cacheResponse as string;
  }

  public async deleteCachedPasswordResetOTP(email: string) {
    const key = `password-reset-${email.toLowerCase()}`;
    try {
      await redisClient.del(key);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Deleting Cached Data: ${error.message}`);
    }
  }

  ///////////////////////////////////// PASSWORD UPDATE ////////////////////////////
  public async cachePasswordUpdateOTP(userID: string, otp: string) {
    try {
      userID = `password-update-${userID}`;
      await redisClient.setEx(userID, 900, otp);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Caching Data: ${error.message}`);
    }
  }

  public async getCachedPasswordUpdateOTP(userID: string): Promise<string> {
    userID = `password-update-${userID}`;
    const otp = await redisClient.get(userID);
    if (!otp) throw new AppError(404, "Expired OTP");
    return otp as string;
  }

  public async deleteCachedPasswordUpdateOTP(userID: string) {
    const key = `password-update-${userID}`;
    try {
      await redisClient.del(key);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Deleting Cached Data: ${error.message}`);
    }
  }

  // public async cacheWithdrawalPINTrial(email: string, trials = "5") {
  //   try {
  //     email = `transaction-pin-${email.toLowerCase()}`;
  //     await redisClient.setEx(email, 900, trials);
  //     return;
  //   } catch (error: any) {
  //     throw new AppError(500, `Error Caching Data: ${error.message}`);
  //   }
  // }

  // public async getCacheWithdrawalPINTrial(
  //   email: string
  // ): Promise<string | null> {
  //     email = `transaction-pin-${email.toLowerCase()}`;
  //     const trials = await redisClient.get(email);
  //     if (!trials) return null;
  //     return trials;
  // }

  // public async cacheWithdrawalInfo(agentID: string, payload: any) {
  //   try {
  //     const withdrawalKey = `withdrawal-${agentID}`;
  //     await redisClient.set(withdrawalKey, JSON.stringify(payload));
  //     await redisClient.expire(withdrawalKey, 900);
  //     return;
  //   } catch (error: any) {
  //     throw new AppError(500, `Error Caching Data: ${error.message}`);
  //   }
  // }

  // public async getCachedWithdrawalInfo(agentID: string) {
  //   try {
  //     const withdrawalKey = `withdrawal-${agentID}`;
  //     const withdrawalInfo = await redisClient.get(withdrawalKey);
  //     if (!withdrawalInfo) throw new AppError(404, "Expired OTP!");
  //     return withdrawalInfo;
  //   } catch (error: any) {
  //     throw new AppError(404, `Error Getting Cached Data: ${error.message}`);
  //   }
  // }

  // public async cacheLoginOTP(email: string, otp: string) {
  //   try {
  //     email = `login-${email.toLowerCase()}`;
  //     console.log(email);
  //     await redisClient.setEx(email, 900, otp);
  //     return;
  //   } catch (error: any) {
  //     throw new AppError(500, `Error Caching Data: ${error.message}`);
  //   }
  // }

  // public async getCachedLoginOTP(email: string): Promise<string> {
  //   try {
  //     email = `login-${email.toLowerCase()}`;
  //     const otp = await redisClient.get(email);
  //     if (!otp) throw new AppError(404, "Expired OTP");
  //     return otp;
  //   } catch (error: any) {
  //     throw new AppError(404, `Error Getting Cached Data: ${error.message}`);
  //   }
  // }

  public async cacheAuthorizationToken(userID: string, refreshToken: string) {
    try {
      const duration = parseInt(process.env["JWT_REFRESH_DURATION"]!);
      await redisClient.setEx(refreshToken, duration, userID);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Caching Data: ${error.message}`);
    }
  }

  public async getAuthorizationToken(refreshToken: string): Promise<string> {
    try {
      const refreshSecret = await redisClient.get(refreshToken);
      if (!refreshSecret) throw new AppError(404, "Expired Token");
      return refreshSecret as string;
    } catch (error: any) {
      throw new AppError(404, `Error Getting Cached Data: ${error.message}`);
    }
  }

  public async deleteCachedData(key: string) {
    try {
      await redisClient.del(key);
      return;
    } catch (error: any) {
      throw new AppError(500, `Error Deleting Cached Data: ${error.message}`);
    }
  }
}
