import { Request, Response } from "express";
import dataUri from "datauri/parser"
import path from "path";
import cloudinary from "../config/cloudinary";




const dUri=new dataUri();
const uploadImage = async (req: Request, res: Response)=> {
    try {
        const file=req.file;
        console.log(req.file)
        if(!file)
        {
            return res.status(400).json({message:"Please Upload File",success:true,error:false})
        }
        const fileData=dUri.format(path.extname(file.originalname).toString(),file.buffer);
        if(!fileData || !fileData.content) {
            return res.status(400).json({
                message: "File Content is not available", success: false, error: true
            });
           }
        const result=await cloudinary.uploader.upload(fileData.content,{
            
            folder:"product-images"
        })
        const productImgUrl=result.secure_url;
        return res.status(200).json({message:"Image Upload success",success:true,error:false,data:productImgUrl})


        

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({message:"There is an error while uploading image",success:false,error:true})
    }
}



export {uploadImage}