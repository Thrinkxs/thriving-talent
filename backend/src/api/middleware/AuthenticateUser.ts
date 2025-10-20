import jwt from "jsonwebtoken";
import { NextFunction, Request, Response, RequestHandler } from "express";
import cookie from "cookie";
import { AuthenticationTokenGenerator } from "../services/Unique.Service";
import { Employer } from "../models/Employer";
import { ExtendedRequest } from "../../utils/Interface";
// type AuthenticatedRequestHandler = RequestHandler<{}, any, any, any, Record<string, any>>;

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const tokenAuthentication = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = (() => {
    const authHeader = req.header("Authorization")?.replace("Bearer ", "");
    if (process.env.NODE_ENV === "production") {
      return req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    }
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    return cookies["access-token"] || authHeader;
  })();

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthenticated. Please login and provide a token" });
  }
  try {
    const authorizationInfo = new AuthenticationTokenGenerator().verifyToken(
      token
    );
    req.account = authorizationInfo;
    return next();
  } catch (error: any) {
    return res.status(401).json({ message: "Unauthenticated: Invalid token" });
  }
};

export const employerVerification = async (
  req: ExtendedRequest | any,
  res: Response,
  next: NextFunction
) => {
  return tokenAuthentication(req, res, async () => {
    const { accountID } = req.account!;
    if (!req.account || !accountID) {
      return res
        .status(403)
        .json({ message: "Missing Profile: Account not found" });
    }
    const account = await Employer.findOne({
      _id: accountID,
      isDeleted: false,
    });
    if (!account)
      return res
        .status(403)
        .json({ message: "Missing Profile: Account not found" });
    const { status } = account;

    if (status == "suspended") {
      return res.status(403).json({
        message:
          "Unauthorized: Your account has been suspended, please contact admin for more information",
      });
    }

    req.account = account;

    return next();
  });
};
