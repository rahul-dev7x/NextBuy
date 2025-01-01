import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button';
import AxiosError from '@/utills/AxiosError';
import Axios from '@/utills/Axios';
import summaryApi from '@/common/SummaryApi';
import { toast } from 'sonner';

const EditCategory = ({close,editData,fetchCategory}) => {
    const [data,setData]=useState({
        _id:editData._id,
        name:editData.name || "",
        image:editData.image
    })

console.log(data)

    const handleImageChange=(e)=>{
const file=e.target.files?e.target.files[0]:"";
setData({...data,image:file})
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData({...data,[name]:value})
    }
    const handleSubmit=async(e)=>{
e.preventDefault();
const formdata=new FormData();
formdata.append("id",data._id)
formdata.append("name",data.name);

if(data.image)
{
  formdata.append("image",data.image)
}
console.log("formdata",formdata)
try{
const response=await Axios({...summaryApi.update_category,data:formdata})
console.log(response);
const data=response.data;
if(data.success)
{
  toast.success(data.message)
  close()
  fetchCategory()
}
else
{
  toast.error(data.message)
}
}
catch(error)
{
    AxiosError(error)
}
    }
  return (
    <div className='bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50'>
      <form className='w-[400px] bg-white shadow-lg rounded-md p-6' onSubmit={handleSubmit}>
        <div className='flex justify-between items-center'>
<h1>Edit Category</h1>
<button
              onClick={close}
              type="button"
              className="text-gray-500 hover:text-gray-700"
            >
              <RxCross2 size={20} />
            </button>
            </div>
            <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="categoryName">Category Name:</Label>
              <Input
                type="text"
                id="categoryName"
                name="name"
                className="mt-2"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className={`${
                data.image ? "justify-between items-center flex" : ""
              } p-4`}
            >
             <div>
  {editData && (
    <img
      src={
        typeof data.image === "string"
          ? data.image
          : URL.createObjectURL(data.image)
      }
      alt="category-image"
      className="object-cover rounded-md w-24 h-24"
    />
  )}
</div>

              <div>
                <Button>
                  <Label htmlFor="uploadcategory">Upload Category Image</Label>
                </Button>
                <Input
                  type="file"
                  id="uploadcategory"
                  className="hidden"
                  name="image"
                  onChange={handleImageChange}
                  disabled={!data.name}
                  
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white w-full mt-4"
            disabled={!data.name || !data.image}
          >
            Update Category
          </Button>
  
      </form>
    </div>
  )
}

export default EditCategory
