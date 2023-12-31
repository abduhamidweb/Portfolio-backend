import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const JWT = {
    SIGN: (payload: any): string => {
        // const expiresIn = 60 * 60*99999990;
        return jwt.sign(payload, secretKey);
    },
    VERIFY: (token: string): any => {
        return jwt.verify(token, secretKey);
    }
};