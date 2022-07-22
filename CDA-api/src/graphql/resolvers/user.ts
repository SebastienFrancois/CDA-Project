import { IUser, UserModel, validateUser } from '../../schemas/user.schemas';
import { hashPassword, verifyPassword } from '../../../utils/pwd';
import { generateToken } from '../../../utils/token';
import { ApolloError } from 'apollo-server-express';


export default{
    Query: {
        getUsers: async () => await UserModel.find({}),
        getUser: async (_:ParentNode, args: {id: String}) => await UserModel.findById({_id: args.id}) 
    },
    Mutation: {
        addUser: async ( _ :ParentNode, args: IUser ) => {
            // validate with Joi
            const err = validateUser(args);
            if (err.error) return {
                code: 400,
                success: false,
                message: err.error,
                token: null,
                email: null
            }

            // verify if users already exists first
            const userExist = await UserModel.findOne({email: args.email});

            if (userExist) throw new ApolloError("User already exists");
            
            // hash password from user
            const hash = await hashPassword(args.password);

            if (!hash) throw new ApolloError('Hashing password not completed');

            // try catch to save user, return UserResponse
            try {
                const newUser: IUser = await UserModel.create({
                    username: args.username,
                    email: args.email,
                    password: hash,
                    picture: args.picture,
                    preferred_language: args.preferred_language,
                });
                await newUser.save()
                return {
                    code: 200,
                    success: true,
                    message: 'User created successfully',
                    token: generateToken(newUser),
                    email: newUser.email
                }
            } catch (error: any) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    token: null,
                    email: null
                }
            }
        },
        // deleteUser : async (_:ParentNode, args: {id: String}) => {
        //     try {
        //         await UserModel.findOneAndDelete({_id: args.id})
        //         return JSON.stringify({message:`User "${args.id}" has been deleted successfully !`})
        //     } catch (error) {
        //         return new Error(`User "${args.id}" wasn't deleted !`)
        //     }
        // },
        // updateUser: async (_:ParentNode, args: IUser) => { 
        //     try {
        //         const newUser = await UserModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
        //         return newUser
        //     } catch (error) {
        //         return new Error(`Instance "${args.id}" wasn't updated !`)
        //     }
        // },
        login: async (_: ParentNode, { email, password }: { email: string, password: string }) => {
            const currentUser = await UserModel.findOne({email});
            if (!currentUser) {
                return new Error('Invalid email or password');
            }
            const isValid = await verifyPassword(password, currentUser.password);

            if (!isValid) {
                return new Error('Invalid email or password');
            }
            
            return generateToken(currentUser);
          }
    },
}