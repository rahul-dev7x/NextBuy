import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import upload from "../middleware/multer";
import { createCategory, getCategory, updateCategory } from "../controller/category.controller";


const route=express.Router();



route.post("/create-category",auth,upload.single("category_image"),(req:Request,res:Response)=>{
    createCategory(req,res)
})
route.get("/get-category",auth,(req:Request,res:Response)=>{
    getCategory(req,res)
})
route.put("/update-category",auth,upload.single("image"),(req:Request,res:Response)=>{
    updateCategory(req,res)
})

export default route;