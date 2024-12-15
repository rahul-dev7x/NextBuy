import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"
import sendEmail from "../config/sendEmail";
import verifyEmailTemplate from "../utills/verifyEmailTemplate";
import generateAccessToken from "../utills/generateAccessToken";
import generateRefreshToken from "../utills/generateRefreshToken";
import dataUri from "datauri/parser"
import path from "path";
import cloudinary from "../config/cloudinary";
import generateOtp from "../utills/generateOtp";
import verifyForgetPasswordTemplate from "../utills/verifyForgetPasswordlTemplate";
import jwt from "jsonwebtoken"




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

const dUri=new dataUri();
const uploadAvatar=async(req:Request,res:Response)=>{
    try{
        const file = req.file;
        if(!file) {
            return res.status(400).json({message: "File is not available", success: false, error: true});
        }
       //console.log(file)
       const fileData = dUri.format(path.extname(file.originalname).toString(), file.buffer);
       //console.log(fileData);
       if(!fileData || !fileData.content) {
        return res.status(400).json({
            message: "File Content is not available", success: false, error: true
        });
       }
       const result=await cloudinary.uploader.upload(fileData.content,{
        folder:"Avatars"
       })
       //console.log(result);
       const avatarUrl=result.secure_url;
       const userid=req.userId;
       const user=await UserModel.findByIdAndUpdate(userid,{avatar:avatarUrl},{new:true});
       console.log(user?.avatar)
       return res.status(200).json({
        message: "Avatar uploaded successfully",
        avatar: avatarUrl,
        success: true,
      });
    }
    catch(err)
    {
        return res.status(500).json({message:"Something error while uploading profile img",error:true,success:false})
    }
}



const updateUserDetails=async(req:Request,res:Response)=>{
    try{
const {name,email,mobile,password}=req.body;
const userid=req.userId;
let hashedPassword="";
if(password) {
    hashedPassword = await bcrypt.hash(password, 10);
}

const updateUser=await UserModel.updateOne({_id:userid},{
...(name && {name:name}),
...(email && {email:email}),
...(mobile && {mobile:mobile}),
...(password && {password:hashedPassword})
})
return res.status(200).json({message:"User Details Updated Successfully",success:true,error:false})
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"There is an error while updating",success:false,error:true})
    }
}


const forgetPassword=async(req:Request,res:Response)=>{
    try{
const {email}=req.body;
const user=await UserModel.findOne({email});
if(!user)
{
    return res.status(400).json({message:"Email is Not registered",success:false,error:true});
}
const otp = generateOtp();
const expiryTime = new Date(Date.now() + 60 * 60 * 1000);
const update = await UserModel.findByIdAndUpdate(user._id, {
    forgot_password_otp: otp,
    forgot_password_expiry: expiryTime.toISOString()
});
await sendEmail({
    sendTo: email,
    subject: "Forgot Password From Next Buy",
    html: verifyForgetPasswordTemplate({name:user.name,otp:otp})
});
return res.status(200).json({message: "OTP sent successfully", success: true, error: false});
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({message:"Error while forgot password",success:false,error:true})
    }
}
const verifyForgotPassword=async(req:Request,res:Response)=>{
    try{
const {email,otp}=req.body;
if(!email || !otp){
    return res.status(400).json({
        message : "Provide required field email, otp.",
        error : true,
        success : false
    })
}

const user=await UserModel.findOne({email});
if(!user)
    {
        return res.status(400).json({
            message : "User not available",
            error : true,
            success : false
        })
    }
const currentTime = new Date();
if(currentTime > new Date(user.forgot_password_expiry))
{
    return res.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false
    });
}
if(otp !== user.forgot_password_otp){
    return res.status(400).json({
        message : "Invalid otp",
        error : true,
        success : false
    })
}
const updateUser=await UserModel.findByIdAndUpdate(user._id,{orgot_password_otp : "",
    forgot_password_expiry : ""})
    return res.status(200).json({message:"Otp Verification Successful",success:true,error:false})
}

    catch(err)
    {
        return res.status(500).json({message:"err while verifying otp",success:false,error:true})
    }
}


const resetPassword=async(req:Request,res:Response)=>{
    try{
const {email,newPassword,confirmPassword}=req.body;
if(!email || !newPassword || !confirmPassword)
{
    return res.status(400).json({message:"Please fill all the fields",success:false,error:true})
}
const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "newPassword and confirmPassword must be same.",
                error : true,
                success : false,
            })
        }
        const hashedPasssword=await bcrypt.hash(newPassword,10);
const update=await UserModel.findOneAndUpdate(user._id,{password:hashedPasssword});
return res.json({
    message : "Password updated successfully.",
    error : false,
    success : true
})
    }
    catch(err)
    {
        return res.status(500).json({message:"err while reset password",success:false,error:true})
    }
}
const refreshToken=async(req:Request,res:Response)=>{
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return res.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        interface DecodedToken {
            _id: string;
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY as string) as DecodedToken;

        if(!verifyToken){
            return res.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken._id;

        const newAccessToken = await generateAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "none" as const
        }

        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message : error,
            error : true,
            success : false
        })
    }
}


export { registerUser ,verifyEmailController,loginUser,logoutUser,uploadAvatar,updateUserDetails,forgetPassword,verifyForgotPassword,resetPassword,refreshToken};