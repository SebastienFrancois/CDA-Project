import { hash, genSalt, compare } from 'bcrypt';

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    return await hash(password, salt )

}

export const verifyPassword = async (password: string, hash: string) => {
    return await compare(password, hash)
}