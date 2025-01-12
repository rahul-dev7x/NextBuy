
import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import { truncate } from 'fs';






const addProduct=async(req:Request,res:Response)=>{
    try{
//console.log(req.body)
const { name ,
    image ,
    category,
    subCategory,
    unit,
    stock,
    price,
    discount,
    description,
    more_details}=req.body;
    if(!name || !image[0] || !category[0] || !subCategory[0] || !price || !description ){
        return res.status(400).json({
            message : "Enter required fields",
            error : true,
            success : false
        })
    }

    const product = new ProductModel({
        name ,
        image ,
        category,
        subCategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
    })
    const saveProduct = await product.save()

    return res.json({
        message : "Product Created Successfully",
        data : saveProduct,
        error : false,
        success : true
    })
    }
    catch(error)
    {
        return res.status(500).json({message:"There is an error while trying to upload products",success:true,error:false})
    }
}




const getProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    let { page, limit , search  }= req.body;

    // page = Number(page);
    // limit = Number(limit);

    const skip = (page - 1) * limit;
    

    const query = search
      ? {
          $text: { $search: search },
        }
      : {};

    const [products, totalCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: 'Product found successfully',
      error: false,
      success: true,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      products,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: 'There was an error while trying to get products',
      success: false,
      error: true,
    });
  }
};





const getProductsByCategory=async(req:Request,res:Response)=>{
  try{
    const {id}=req.body;
    if(!id)
    {
      return res.status(400).json({message:"Please provide id",sucess:false,error:true})
    }
    const products=await ProductModel.find({
      category:{$in:id}
    }).limit(15);
    //console.log(products)
    return res.status(200).json({message:"Product found success",success:true,error:false,data:products})

  }
  catch(error)
  {
    return res.status(500).json({message:"There is an error while trying to find products by category",success:false,error:true})
  }
}




const getProductByCategoryAndSubCategory=async(req:Request,res:Response)=>{
  try{
    const {categoryId,subCategoryId}=req.body;
    if(!categoryId
    )
    {
      return res.status(400).json({message:"Please provide Catgroyid",success:false,error:true})
    }
    if(!subCategoryId)
    {
      return res.status(400).json({message:"Please Provide subcategoryid",success:false,error:true})
    }

    const query = {
      category : { $in :categoryId  },
      subCategory : { $in : subCategoryId }
  }
  //console.log("Query:", query);
    const products=await ProductModel.find(query);
    // if (products.length === 0) {
    //   return res.status(404).json({
    //     message: "No products found",
    //     success: false,
    //     error: true,
    //   });
    // }
    return res.status(200).json({message:"Products found success",success:true,error:false,data:products})

  }
  catch(error)
  {
return res.status(500).json({message:"There is an error ",success:false,error:true})
  }
}




export {addProduct,getProduct,getProductsByCategory,getProductByCategoryAndSubCategory}