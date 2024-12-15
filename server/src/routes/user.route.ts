import express, { NextFunction, Request, Response } from "express";
import { forgetPassword, loginUser, logoutUser, registerUser, updateUserDetails, uploadAvatar, verifyEmailController } from "../controller/user.controller";
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
route.get("/logout",auth,(req:Request,res:Response)=>{
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

export default route;