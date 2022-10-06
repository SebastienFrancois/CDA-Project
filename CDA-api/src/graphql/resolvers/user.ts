import { TUser } from '../../../appolo-server';
import { generateToken } from '../../../utils/token';
import hasPermissions from '../../../utils/userInfos';
import { AuthenticationError } from 'apollo-server-errors';
import { hashPassword, verifyPassword } from '../../../utils/pwd';
import { IUser, UserModel, validateUser } from '../../schemas/user.schemas';
import sendMail from '../../emails/emailFactory';

export default{
    Query: {
        getUsers: async (_:ParentNode, __: any, context: {user: TUser}) =>{
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'getUsers'))  throw new AuthenticationError("Not authorized");

            return await UserModel.find({})
        },
        getUser: async (_:ParentNode, args: {id: String}) => await UserModel.findById({_id: args.id}) 
    },
    Mutation: {
        addUser: async ( _ :ParentNode, args: IUser, context: {user: TUser} ) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'addUser'))  throw new AuthenticationError("Not authorized");
            
            const err = validateUser(args);
            if (err.error) return err.error

            const userExist = await UserModel.findOne({email: args.email});

            if (userExist){
                console.log(userExist); 
                return new Error('User already exist');
            } 
            
            const hash = await hashPassword(args.password);

            if (!hash) return new Error("Problem occured while hashing password")

            try {
                const newUser: IUser = await UserModel.create({
                    username: args.username,
                    email: args.email,
                    password: hash,
                    picture: args.picture,
                    preferred_language: args.preferred_language,
                    role: args.role
                });
                await newUser.save()
                return {token: generateToken(newUser), email: newUser.email}

            } catch (error: any) {
                return new Error(error.message )
            }
            
        },
        login: async (parent: ParentNode, { email, password }: { email: string, password: string }) => {
            const currentUser = await UserModel.findOne({email});
            if (!currentUser) {
                return new Error('Invalid email or password');
            }
            const isValid = await verifyPassword(password, currentUser.password);
            
            if (!isValid) {
                return new Error('Invalid email or password');
            }
            
            return generateToken(currentUser);
        },
        updateUserInfosAsAdmin: async (_:ParentNode, args: IUser, context: {user: TUser}) => { 
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'updateUserInfoAsAdmin'))  throw new AuthenticationError("Not authorized");

            if(args.password) {
                const hash = await hashPassword(args.password);
    
                if (!hash) return new Error("Problem occured while hashing password")

                args.password = hash
            }


            try {
                const newUser = await UserModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return newUser
            } catch (error) {
                return new Error(`Instance "${args.id}" wasn't updated !`)
            }
        },
        updateUserInfosAsUser: async (_:ParentNode, args: IUser, context: {user: TUser}) => { 

            if(!context.user) throw new AuthenticationError('Invalid token');

            if(context.user.id !== args.id) throw new AuthenticationError("Not authorized ! Only profile owner can modify user related infos !");

            if(!hasPermissions(context.user, 'updateUserInfosAsUser'))  throw new AuthenticationError("Not authorized");

            if(args.password) {
                const hash = await hashPassword(args.password);
    
                if (!hash) return new Error("Problem occured while hashing password")

                args.password = hash
            }

            try {
                const newUser = await UserModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return newUser
            } catch (error) {
                return new Error(`Instance "${args.id}" wasn't updated !`)
            }
        },
        deleteUser : async (_:ParentNode, args: {id: String}, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            
            if(!hasPermissions(context.user, 'deleteUser'))  throw new AuthenticationError("Not authorized");

            try {
                await UserModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`User "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return new Error(`User "${args.id}" wasn't deleted !`)
            }
        },
        retrievePassword : async (_:ParentNode, args: {email: string }) => {
            if(!args.email) throw new AuthenticationError('Invalid request');

            const user = await UserModel.findOne({email: args.email}) 
            if(!user) throw new AuthenticationError("User does not exist !")
            
            const token = generateToken(user);

            try {
                sendMail({to: args.email, subject:'Reinitialisation de mot de passe', text:'Suivez ce lien =>', html:`<a href=${process?.env.APP_URL}/reset_password?token=${token} target='_blank'>Changer votre mot de passe</a>`})
            } catch (error) {
                return {success: false}
            }
            
            return { success: true }
        },
        
    },
}