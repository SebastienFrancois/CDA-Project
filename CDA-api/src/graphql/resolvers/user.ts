
import { IUser, UserModel, validateUser } from '../../schemas/user.schemas';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


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

            if (userExist){
                console.log(userExist); 
                return new Error('User already exist');
            } 

            const salt = await bcrypt.genSalt(10);
            
            const hash = await bcrypt.hash(args.password, salt);

            if (!hash) return new Error("Problem occured while hashing password")

            try {
                const newUser: IUser = await UserModel.create({
                    username: args.username,
                    email: args.email,
                    password: hash,	
                    picture: args.picture,
                    preferred_language: args.preferred_language,
                });
                await newUser.save()
                return {token: generateToken(newUser), email: newUser.email}

            } catch (error: any) {
                return new Error(error.message )
            }
            
        },
        deleteUser : async (_:ParentNode, args: {id: String}) => {
            try {
                await UserModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`User "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return new Error(`User "${args.id}" wasn't deleted !`)
            }
        },
        updateUser: async (_:ParentNode, args: IUser) => { 
            try {
                const newUser = await UserModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return newUser
            } catch (error) {
                return new Error(`Instance "${args.id}" wasn't updated !`)
            }
        },
        login: async (parent: ParentNode, { email, password }: { email: string, password: string }) => {
            const currentUser = await UserModel.findOne({email});
            if (!currentUser) {
                return new Error('Invalid email or password');
            }
            const isValid = await bcrypt.compare( password, currentUser.password);

            if (isValid) {
                return generateToken(currentUser);
            }

            return new Error('Invalid email or password');
          }
    },
}

const generateToken =  (user: IUser) => {
    const secret_key : string = (process.env.PRIVATE_KEY as string);
    return jwt.sign(
      { data: {username: user.username, email: user.email, preferred_language: user.preferred_language} },
      secret_key,
      { algorithm: "HS256", expiresIn: "1d" }
    );
}