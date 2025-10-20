import { Request, Response } from "express";
import { IEmployer } from "../api/models/Employer";

export interface AdminAuthorizationHeader {
  adminID: string;
}

export interface ExtendedRequest extends Request {
  account?: IEmployer;
  //   admin?: IAdmin;
}

export interface ExtendedResponse extends Response {
  productID?: any;
  productData?: any;
}

export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
