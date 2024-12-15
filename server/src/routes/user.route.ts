import express, { NextFunction, Request, Response } from "express";
import { loginUser, logoutUser, registerUser, verifyEmailController } from "../controller/user.controller";
import auth from "../middleware/auth";






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
route.get("/logout",(req:Request,res:Response,next:NextFunction)=>{
    auth(req,res,next)
},(req:Request,res:Response)=>{
    logoutUser(req,res)
});


export default route;