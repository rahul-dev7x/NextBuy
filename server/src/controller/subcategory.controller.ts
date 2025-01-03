import { Request, Response } from "express"
import dataUri from "datauri/parser"
import path from "path";
import cloudinary from "../config/cloudinary";
import SubCategoryModel from './../models/subCategory.model';






const dUri=new dataUri()


const createSubCategory=async(req:Request,res:Response)=>{


    try{
        const {subcategory,categories}=req.body;
        const file=req.file;
        //console.log(req.body);
        //console.log(req.file)
        if(!subcategory || !categories)
        {
            return res.status(400).json({message:"please provide subcategory and category",success:false,error:true})
        }
        if(!file)
        {
            return res.status(400).json({message:"please provide File",success:false,error:true})
        }
        const fileData=dUri.format(path.extname(file.originalname).toString(),file.buffer);
        if(!fileData || !fileData.content)
        {
            return res.status(400).json({message:"File Content is not available",success:false,error:true})
        }
        const result=await cloudinary.uploader.upload(fileData.content,{
            folder:"SubCategory"
        })
const subcategoryImgUrl=result.secure_url;
const subCategory=new SubCategoryModel({
    name:subcategory,
    image:subcategoryImgUrl,
    category:categories

})
await subCategory.save();


        return res.status(200).json({message:"Subcategory created successfully",success:true,error:false})

    }
    catch(error){
return res.status(500).json({message:"There is an error while trying to create sub category",success:false,error:true})
    }
}




const getAllSubCategory=async(req:Request,res:Response)=>{
    try{
const subCategory=await SubCategoryModel.find().sort({createdAt:-1}).populate("category")
return res.status(200).json({message:"Successfull Found the subcategory",success:true,error:false,data:subCategory})
    }
    catch(error){

    }
}




const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, id, categories } = req.body;
    const file = req.file;
    
    console.log("backend_api_data", req.body);
    
    const subCategory = await SubCategoryModel.findById(id);
    if (!subCategory) {
      return res
        .status(404)
        .json({ message: "SubCategory not found", success: false, error: true });
    }

    let updatedUrl = subCategory.image;

    if (file) {
      const fileData = dUri.format(path.extname(file.originalname).toString(), file.buffer);
      if (!fileData.content) {
        return res.status(400).json({ message: "File content is not available", success: false, error: true });
      }
      const result = await cloudinary.uploader.upload(fileData.content, { folder: "SubCategory" });
      updatedUrl = result.secure_url;
    }

    if (name && name !== subCategory.name) {
      subCategory.name = name;
    }

    if (categories) {
      subCategory.category = JSON.parse(categories);
    }

    if (updatedUrl !== subCategory.image) {
      subCategory.image = updatedUrl;
    }

    await subCategory.save();

    return res.status(200).json({
      message: "SubCategory data updated successfully",
      success: true,
      error: false,
      data: subCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};



const deleteSubCategory=async(req:Request,res:Response)=>{
try{
  const {id}=req.body;
  console.log(req.body)
  if(!id)
  {
    return res.status(400).json({message:"subcategory Id is required",success:false,error:true})
  }
  
  const category=await SubCategoryModel.findById(id);
if(!category)
{
  return res.status(404).json({ message: "subcategory not found", success: false, error: true });
}
await SubCategoryModel.deleteOne({ _id: id });
 
  return res.status(200).json({message:"Deleted subcategory success",success:true,error:false})

}
catch(error){
  return res.status(500).json({message:"Error while trying to delete",success:false,error:true})

}
}

export {createSubCategory,updateSubCategory,getAllSubCategory,deleteSubCategory}