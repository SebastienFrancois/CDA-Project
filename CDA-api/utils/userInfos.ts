import { AuthenticationError } from "apollo-server-express";
import { TUser } from "../appolo-server";
import { Role, UserModel } from "../src/schemas/user.schemas";

export const retrieveUser = async (id: string) => {
        const user = await UserModel.findOne({ _id: id });
        if (!user) return new AuthenticationError(`User not found`);
        return { ...user };
}

export type TQuerys =
        'getUsers' |
        'getTasks' |
        'getLabels' |
        'getUser' |
        'getProjects' |
        'getTask' |
        'getComments' |
        'getLabel' |
        'getProject' |
        'getComment' |
        'getNotifications' |
        'getNotification';

export type TMutations =
        'addUser' |
        'addProject' |
        'deleteProject' |
        'updateProject' |
        'addLabel' |
        'deleteLabel' |
        'updateLabel' |
        'addTask' |
        'deleteTask' |
        'updateTask' |
        'addComment' |
        'deleteComment' |
        'updateComment' |
        'addNotification' |
        'deleteNotification' |
        'updateNotification';

type TPermissionItem = TQuerys | TMutations

const permissions: { [key: string]: TPermissionItem[]} = {
        ADMIN: [
                'addComment',
                'addLabel',
                'addNotification',
                'addProject',
                'addTask',
                'addUser',
                'deleteComment',
                'deleteLabel',
                'deleteNotification',
                'deleteProject',
                'deleteTask',
                'getComment',
                'getComments',
                'getLabel',
                'getLabels',
                'getNotification', 
                'getNotifications',
                'getProject',
                'getProjects',
                'getTask',
                'getTasks',
                'getUser',
                'getUsers',
                'updateComment',
                'updateLabel',
                'updateNotification',
                'updateProject',
                'updateTask',
        ],
        CO: ['getUsers','getUser','getProjects', 'getProject', 'addProject', 'updateProject', 'deleteProject', 'getTasks','getTask', 'addTask','updateTask', 'deleteTask', 'addComment', 'updateComment','deleteComment'],
        DEV: ['getProjects', 'getProject', 'getTasks','getTask', 'addTask','updateTask','getComments', 'getComment', 'addComment', 'updateComment'],
}

const hasPermissions = (user: TUser, action: TMutations | TQuerys) => {
        const { role } = user;
        const result :boolean = permissions[role].includes(action)
        return result
}

export default hasPermissions;