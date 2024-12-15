import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config({})




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


if(!process.env.ACCESS_TOKEN_SECRET_KEY)
{
    throw new Error("access token secret key not available")
}

const auth = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];
        //const token = req.headers['authorization']?.split(' ')[1];
        console.log(token)
        console.log(req.cookies)
       
        if(!token){
            return res.status(401).json({
                message : "Provide token",error:true,success:false
            })
        }

        const decode = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY as string) as DecodedToken

        if(!decode){
            return res.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }

        req.userId = decode.id

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "You have not login",
            error : true,
            success : false
        })
    }
}

export default auth