import hasPermissions from '../../utils/userInfos'

describe("User permissions", () => {
    describe('Admin ROLE', () => {

        const userContext = {
            user: {
                id: '62d9085717a2a3fa8f49b3b7',
                email: 'hulk@avengers.com',
                username: 'bruce banner',
                preferred_language: 'rrrr',
                role: 'ADMIN',
            }
        }

        it('should authorize all user related querys and mutations excepted update of workspace settings',  () => {
            expect(hasPermissions(userContext.user, 'getUsers')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getUser')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addUser')).toBeTruthy();
        })

        it('should authorize all projects related querys and mutations',  () => {
            expect(hasPermissions(userContext.user, 'getProjects')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'updateProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'deleteProject')).toBeTruthy();
        })
    })
    describe('CO ROLE', () => {

        const userContext = {
            user: {
                id: '62d7d64bfe292581d73b75a2',
                email: 'tony-stark@avengers.com',
                username: 'tony',
                preferred_language: 'en',
                role: 'CO',
            }
        }

        it('should not authorize user querying but not user mutations',  () => {
            expect(hasPermissions(userContext.user, 'getUsers')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getUser')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addUser')).toBeFalsy();
        })

        it('should authorize all projects related querys and mutations',  () => {
            expect(hasPermissions(userContext.user, 'getProjects')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'updateProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'deleteProject')).toBeTruthy();
        })

        it('should authorize all task related querys and mutations',  () => {
            expect(hasPermissions(userContext.user, 'getTasks')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getTask')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'updateTask')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'deleteTask')).toBeTruthy();
        })
    })

    describe('DEV ROLE', () => {

        const userContext = {
            user: {
                id: '62da65c16d41b8645d025dec',
                email: 'black-widow@avengers.com',
                username: 'Natasha',
                preferred_language: 'ru',
                role: 'DEV',
            }
        }

        it('should not authorize user to update is own userInfos only',  () => {
            expect(hasPermissions(userContext.user, 'getUsers')).toBeFalsy();
            expect(hasPermissions(userContext.user, 'getUser')).toBeFalsy();
            expect(hasPermissions(userContext.user, 'addUser')).toBeFalsy();
        })

        it('should authorize project querying but no mutations',  () => {
            expect(hasPermissions(userContext.user, 'getProjects')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getProject')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addProject')).toBeFalsy();
            expect(hasPermissions(userContext.user, 'updateProject')).toBeFalsy();
            expect(hasPermissions(userContext.user, 'deleteProject')).toBeFalsy();
        })
        it('should authorize task querying and only mutations [updateTask]',  () => {
            expect(hasPermissions(userContext.user, 'getTasks')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getTask')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addProject')).toBeFalsy();
            expect(hasPermissions(userContext.user, 'updateTask')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'deleteTask')).toBeFalsy();
        })
        it('should authorize comments querying and only mutations [addComment,updateComment]',  () => {
            expect(hasPermissions(userContext.user, 'getComments')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'getComment')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'addComment')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'updateComment')).toBeTruthy();
            expect(hasPermissions(userContext.user, 'deleteComment')).toBeFalsy();
        })
    })

})