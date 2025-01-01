
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

const getCategory=async(req:Request,res:Response)=>{
    try{
        const category=await CategoryModel.find().sort({createdAt:-1});
        return res.status(200).json({message:"Category Found success",success:true,error:false,data:category})

    }
    catch(error){
return res.status(500).json({message:"err while fetching all category",success:false,error:true})
    }
}

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;
    const file = req.file;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required", success: false, error: true });
    }

    
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found", success: false, error: true });
    }

   
    let updatedUrl = category.image;  
    if (file) {
      const fileData = dUri.format(path.extname(file.originalname).toString(), file.buffer);

      if (!fileData || !fileData.content) {
        return res.status(400).json({
          message: 'Invalid file content',
          success: false,
          error: true,
        });
      }

      
      const result = await cloudinary.uploader.upload(fileData.content, {
        folder: 'Category',
      });

      updatedUrl = result.secure_url;  
    }

  
    category.name = name || category.name;  
    category.image = updatedUrl;  

    await category.save(); 

   
    return res.status(200).json({
      message: 'Category updated successfully',
      success: true,
      error: false,
      data: category, 
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error while updating category',
      success: false,
      error: true,
    });
  }
};


export {createCategory,getCategory,updateCategory}