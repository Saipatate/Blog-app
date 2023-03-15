import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";

interface JwtPayload {
  _id: number;
}

interface Request {
  user: string | unknown;
  headers: any;
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    req.user = await UserModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
