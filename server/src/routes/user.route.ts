import express, { NextFunction, Request, Response } from "express";
import { forgetPassword, loginUser, logoutUser, refreshToken, registerUser, resetPassword, updateUserDetails, uploadAvatar, verifyEmailController, verifyForgotPassword } from "../controller/user.controller";
import auth from "../middleware/auth";
import upload from "../middleware/multer";






const route=express.Router();

route.post("/register",(req:Request,res:Response)=>{
    registerUser(req,res);
});
route.post("/verify-email",(req:Request,res:Response)=>{
    verifyEmailController(req,res)
})

route.post("/login",(req:Request,res:Response)=>{
    loginUser(req,res)
})
route.get("/logout",(req:Request,res:Response)=>{
    logoutUser(req,res)
});
route.put("/upload-avatar",auth,upload.single('avatar'),(req:Request,res:Response)=>{
    uploadAvatar(req,res)
})
route.put("/update-user",auth,(req:Request,res:Response)=>{
    updateUserDetails(req,res);
});
route.put("/forgot-password",(req:Request,res:Response)=>{
    forgetPassword(req,res)
})
route.put("/verify-forgot-password",(req:Request,res:Response)=>{
    verifyForgotPassword(req,res)
})
route.put("/reset-password",(req:Request,res:Response)=>{
    resetPassword(req,res)
})
route.put("/refresh-token",(req:Request,res:Response)=>{
    refreshToken(req,res)
})
export default route;