import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"
import sendEmail from "../config/sendEmail";
import verifyEmailTemplate from "../utills/verifyEmailTemplate";
import generateAccessToken from "../utills/generateAccessToken";
import generateRefreshToken from "../utills/generateRefreshToken";





const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please Provide Email,Name,Password",
                success: false,
                error: true
            })
        }
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exixts with this email", error: true, success: false });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ email, name, password: hashedPassword });
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`


        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify Email from Next Buy",
            html: verifyEmailTemplate({ name, url: verifyEmailUrl })
        });

        return res.status(201).json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "There Is something Error", error: true, success: false })
    }
}


const verifyEmailController = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({ _id: code });
        if (!user) {
            return res.status(400).json({ message: "Invalid User", error: true, success: false })
        }
        const updateUser = await UserModel.updateOne({ _id: code }, { verify_email: true });
        return res.json({
            message: "Verify email done",
            success: true,
            error: false
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while vcerifying email", error: true, success: false })
    }
}

const loginUser=async(req:Request,res:Response)=>{
    try{
const {email,password}=req.body;
if(!email || !password)
{
    return res.status(400).json({message:"Please Enter valid email & password",success:false,error:true})
}
const user=await UserModel.findOne({email});
if(!user)
{
    return res.status(400).json({message:"User with this email is not registered",error:true,success:false});
}
if(user.status!=="Active")
{
    return res.status(400).json({message:"Your account is not active,Contact with admin",error:true,success:false});
}

const matchedPassword=await bcrypt.compare(password,user.password);
if(!matchedPassword)
{
    return res.status(400).json({message:"Password Is not correct",error:true,success:false});
}




const accessToken =await generateAccessToken(user._id.toString());
const refreshToken =await generateRefreshToken(user._id.toString());

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  
    sameSite: 'none' as const
};


 res.cookie("accessToken",accessToken,cookieOption);
 res.cookie("refreshToken",refreshToken,cookieOption);
 

return res.status(200).json({
    message: `${user.name} Logged in successfully`,
    error: false,
    success: true,
    data: {
        accessToken,
        refreshToken
    }
});
    }
    catch(err)
    {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return res.status(500).json({message: errorMessage, error: true, success: false});
    }
}


const logoutUser=async(req:Request,res:Response)=>{
    try{

        const userid=req.userId
        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'none' as const
        };
res.clearCookie("accessToken",cookieOption);
res.clearCookie("refreshToken",cookieOption);
const updateRefreshToken=await UserModel.findByIdAndUpdate(userid,{refresh_token:""})
return res.status(200).json({message:"User Logged Out Success",success:true,error:false})
    }
    catch(err)
{
    console.log(err)
    return res.status(500).json({message:"Error while logging out",success:false,error:true})
}
}





export { registerUser ,verifyEmailController,loginUser,logoutUser};