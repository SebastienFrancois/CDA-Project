import jwt from "jsonwebtoken";
import { IUser } from "../src/schemas/user.schemas";

export interface tokenPayload extends jwt.JwtPayload {
  data: { 
    id: string,
    username: string,
    email: string,
    preferred_language: string
  }
}

export const generateToken =  (user: IUser) => {
    const secret_key : string = (process.env.PRIVATE_KEY as string);
    return jwt.sign(
      { data: {id: user._id, username: user.username, email: user.email, preferred_language: user.preferred_language} },
      secret_key,
      { algorithm: "HS256", expiresIn: "1d" }
    );
}

export const verifyToken = (token: string) => {
  try {
    const tokenPayload = jwt.verify(token, process.env.PRIVATE_KEY as string) as tokenPayload;
    return tokenPayload 
  } catch (error) {
    return false;
  }
};