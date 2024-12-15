import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

interface DecodedToken {
    id: string;
}

const auth = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
        if(!token)
        {
            res.status(401).json({message:"Token is not available",success:false,error:true})
        }
        //console.log(token);
        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string) as DecodedToken;
        //console.log(decode);
        req.userId = decode.id;
        next();
    } catch(err) {
        console.log(err);
        res.status(500).json({message:"error while logged in",success:false,error:true})
    }
}

export default auth;