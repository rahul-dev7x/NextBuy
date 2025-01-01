import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/User/Home";
import SearchPage from "@/components/shared/SearchPage";
import Login from "@/pages/User/Login";
import Register from "@/pages/User/Register";
import ForgotPassword from "@/pages/User/ForgotPassword";
import OtpVerification from "@/pages/User/OtpVerification";
import ResetPassword from "@/pages/User/ResetPassword";
import Profile from "@/layouts/Profile";
import EditProfile from "@/pages/User/EditProfile";
import Dashboard from "@/layouts/Dashboard";
import Category from "@/pages/Dashboard/Category";
import SubCategory from "@/pages/Dashboard/SubCategory";
import UploadProduct from "@/pages/Dashboard/UploadProduct";
import Product from "@/pages/Dashboard/Product";





const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"otp-verification",
                element:<OtpVerification/>
            },
            {
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"profile",
                element:<Profile/>,
                children:[
                    {
                        path:"edit",
                        element:<EditProfile/>
                    }
                ]
            },
            {
            
            }
        ]
    },
    {
        path:"dashboard",
        element:<Dashboard/>,
        children:[
            {
              path:'category',
              element:<Category/>  
            },
            {
                path:'subcategory',
                element:<SubCategory/> 
            },
            {
                path:"upload-product",
                element:<UploadProduct/>
            },
            {
                path:"product",
                element:<Product/>
            }
        ]
    }
])
export default router;