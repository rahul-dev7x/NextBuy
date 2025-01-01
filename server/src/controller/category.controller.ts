
import { Request, Response } from 'express';
import dataUri from "datauri/parser"
import path from 'path';
import cloudinary from '../config/cloudinary';
import CategoryModel from '../models/category.model';




const dUri=new dataUri()
const createCategory=async(req:Request,res:Response)=>{

    try{
       const {category}=req.body;
       const file=req.file;
      // console.log(file);
       if(!category)
       {
        return res.status(400).json({message:"Please Upload Category",success:false,error:true})
       }
       if(!file)
       {
        return res.status(400).json({message:"Please Upload File",success:false,error:true})
       }
       const fileData=dUri.format(path.extname(file.originalname).toString(),file.buffer);
       if(!fileData || !fileData.content) {
        return res.status(400).json({
            message: "File Content is not available", success: false, error: true
        });
       }
       const result=await cloudinary.uploader.upload(fileData.content,{
        folder:"Category"
       })
       const fileUrl=result.secure_url;
       const categoryCreate=new CategoryModel({name:category,image:fileUrl})
       await categoryCreate.save()
       //console.log(fileData);
       return res.status(200).json({message:"Category Uploaded Success",success:true,error:false})

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Something Error happend while trying to create category"})
    }
}


export {createCategory}