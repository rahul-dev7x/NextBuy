import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import { createSubCategory, deleteSubCategory, getAllSubCategory, updateSubCategory } from "../controller/subcategory.controller";
import upload from "../middleware/multer";



const route=express.Router();


route.post("/create-subCategory",auth,upload.single("sub-categoryimage"),(req:Request,res:Response)=>{
    createSubCategory(req,res);
})

route.get("/all-subcategory",auth,(req:Request,res:Response)=>{
    getAllSubCategory(req,res)

})


route.put("/update-subcategory",auth,upload.single("image"),(req:Request,res:Response)=>{
    updateSubCategory(req,res)
})


route.delete("/delete-subcategory",auth,(req:Request,res:Response)=>{
    deleteSubCategory(req,res)
})



export default route;