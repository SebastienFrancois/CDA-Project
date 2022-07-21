import { AuthenticationError } from "apollo-server-express";
import { UserModel } from "../src/schemas/user.schemas";

export const retrieveUser = async (id: string) =>{
        const user = await UserModel.findOne({_id: id});
        if(!user) return new AuthenticationError(`User not found`);
        return {...user};
}