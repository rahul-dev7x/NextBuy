import App from "@/App";

import Home from "@/pages/Home";
import SearchPage from "@/pages/SearchPage";

import { createBrowserRouter } from "react-router-dom";

const router =createBrowserRouter([{
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
        }
    ]
}])


export default router