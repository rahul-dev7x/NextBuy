import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import upload from "../middleware/multer";
import { createCategory } from "../controller/category.controller";


const route=express.Router();



route.post("/create-category",auth,upload.single("category_image"),(req:Request,res:Response)=>{
    createCategory(req,res)
})

export default route;