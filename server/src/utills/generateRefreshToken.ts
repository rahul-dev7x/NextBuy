import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import UserModel from "../models/user.model";
dotenv.config({});
if(!process.env.ACCESS_TOKEN_SECRET_KEY)
{
    throw new Error("Refresh Token secret key not available")
}

const generateRefreshToken = async(userId:string) => {
    const token =await jwt.sign(
        {id: userId}, 
        process.env.REFRESH_TOKEN_SECRET_KEY as string,
        {expiresIn: '30d'}
    );
const updateRefreshToken=await UserModel.updateOne({_id:userId},{refresh_token:token})

    return token;
}

    export default generateRefreshToken;