import express, { Request, Response } from "express";
import { registerUser, verifyEmailController } from "../controller/user.controller";
const route=express.Router();

route.post("/register",(req:Request,res:Response)=>{
    registerUser(req,res);
});
route.post("/verify-email",(req:Request,res:Response)=>{
    verifyEmailController(req,res)
})


export default route;