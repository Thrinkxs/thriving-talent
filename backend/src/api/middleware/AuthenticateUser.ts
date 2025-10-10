import jwt from "jsonwebtoken";
import { NextFunction, Request, Response, RequestHandler } from "express";
import cookie from "cookie";
// type AuthenticatedRequestHandler = RequestHandler<{}, any, any, any, Record<string, any>>;

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateUser: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request headers, e.g., "Authorization: Bearer <token>"
  // const token = req.headers.authorization?.split(" ")[1];
  // const cookies = req.headers.cookie?.split("; ");
  // const token = cookies?.find(cookie => cookie.startsWith("access-token="))?.split("=")[1];
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies["access-token"];
  // const refreshToken = cookies?.find(cookie => cookie.startsWith("refresh-token="))?.split("=")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET!!, (err: any, decodedToken: any) => {
    if (err) {
      console.log("Invalid token", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decodedToken;
   

    next();
  });
};

export default {
  authenticateUser,
};
