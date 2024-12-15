import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config({});
if(!process.env.ACCESS_TOKEN_SECRET_KEY)
{
    throw new Error("Access Token secret key not available")
}

const generateAccessToken = async(userId:string) => {
    const token =await jwt.sign(
        {id: userId}, 
        process.env.ACCESS_TOKEN_SECRET_KEY as string,
        {expiresIn: '6h'}
    );
    return token;
}

    export default generateAccessToken;