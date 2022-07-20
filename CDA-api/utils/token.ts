import jwt from "jsonwebtoken";
import { IUser } from "../src/schemas/user.schemas";

export const generateToken =  (user: IUser) => {
    const secret_key : string = (process.env.PRIVATE_KEY as string);
    return jwt.sign(
      { data: {username: user.username, email: user.email, preferred_language: user.preferred_language} },
      secret_key,
      { algorithm: "HS256", expiresIn: "1d" }
    );
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.PRIVATE_KEY as string);
};