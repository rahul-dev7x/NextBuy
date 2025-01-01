
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"


const Dashboard = () => {
const [activePath,setActivePath]=useState("/dashboard/category")
const navigate=useNavigate()

  const sidebarContent = [
    {
      name: "Category",
      path: "/dashboard/category"
    },
    {
      name: "Sub Category",
      path: "/dashboard/subcategory"
    },
    {
      name: "Upload Product",
      path: "/dashboard/upload-product"
    },
    {
      name: "Product",
      path: "/dashboard/product"
    }
  ]
  const handleActive=(path:string)=>{
setActivePath(path);
navigate(path)

  }


  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-lg flex-col">
      <div className="p-6">
        <h1 className="text-3xl text-center mb-8 font-bold">Next Buy</h1>
        <div>
          <ul className="space-y-4  ">
            {
              sidebarContent.map((item, index) => (
                <li key={index} className="cursor-pointer">
                  <button onClick={()=>handleActive(item.path)} className={`w-full text-left py-2 px-4 rounded-md transition-color text-2xl  ${activePath===item.path?"bg-blue-700 text-white":"hover:bg-gray-100"}`}>
                  {item.name}
                  </button>
                  
                </li>
              ))
            }
          </ul>
        </div>



      </div>
      </aside>
      <div className="bg-gray-100 flex-1 min-h-screen overflow-y-auto flex-col">
        <div className="w-full h-16 z-50 shadow-md bg-white">
<h1 className="text-center text-2xl font-bold p-4">Dashboard</h1>
        </div>
        <div className="p-6">
        <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
