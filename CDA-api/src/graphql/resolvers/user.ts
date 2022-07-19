
import { IUser, UserModel, validateUser } from '../../schemas/user.schemas';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
const argon2 = require('argon2');


export default{
    Query: {
        getUsers: async () => await UserModel.find({}),
        getUser: async (_:ParentNode, args: {id: String}) => await UserModel.findById({_id: args.id}) 
    },
    Mutation: {
        addUser: async ( _ :ParentNode, args: IUser ) => {
            const err = await validateUser(args);
            if (err.error) return err.error

            const userExist = await UserModel.findOne({email: args.email});
            if (userExist) return {message: 'User already exist'}

            const newUser = await UserModel.create({
                username: args.username,
                email: args.email,
                password: argon2.hash(args.password),
                picture: args.picture,
                preferred_language: args.preferred_language,
            })
            newUser.save()
            return JSON.stringify({ user: newUser.email, token: generateToken(newUser) })
        },
        deleteUser : async (_:ParentNode, args: {id: String}) => {
            try {
                await UserModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`User "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` User "${args.id}" wasn't deleted !`})
            }
        },
        updateUser: async (_:ParentNode, args: IUser) => { 
            try {
                const newUser = await UserModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return newUser
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
        login: async (parent: ParentNode, { email, password }: { email: string, password: string }) => {
            const currentUser = await UserModel.findOne({email});
            if (!currentUser) {
                return JSON.stringify({message: 'Invalid email or password'});
            }
            const isValid = await argon2.verify(currentUser.password, password);
            if (isValid) {
                const secret_key : string = (process.env.PRIVATE_KEY as string);
                return generateToken(currentUser);
            }
            return JSON.stringify({message: 'Invalid email or password'});
          }
    },
}

const generateToken = (user: IUser) => {
    const secret_key : string = (process.env.PRIVATE_KEY as string);
    return jwt.sign(
      { data: {username: user.username, email: user.email, preferred_language: user.preferred_language} },
      secret_key,
      { algorithm: "HS256", expiresIn: "1d" }
    );
}