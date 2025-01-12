import express, { Request, Response } from "express"
import { addProduct, getProduct, getProductsByCategory } from "../controller/product.controller";


const route=express.Router();

route.post("/upload-product",(req:Request,res:Response)=>{
    addProduct(req,res)

})
route.post("/get",(req:Request,res:Response)=>{
    getProduct(req,res)
})
route.post("/get-product-by-category",(req:Request,res:Response)=>{
    getProductsByCategory(req,res)
})
export default route;