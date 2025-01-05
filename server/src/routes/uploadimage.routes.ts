import express, { Request, Response } from "express";
import upload from "../middleware/multer";
import { uploadImage } from "../controller/uploadimage.controller";

const route=express.Router();



route.post("/upload",upload.single("image"),(req:Request,res:Response)=>{uploadImage(req,res)})




export default route;