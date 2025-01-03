import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';
import AxiosError from '@/utills/AxiosError';
import Axios from '@/utills/Axios';
import summaryApi from '@/common/SummaryApi';
import { toast } from 'sonner';

const DeleteSubCategory = ({deleteData,close,fetchSubCategory}) => {
    const [id,setId]=useState(deleteData || null);
    //console.log("id",id)
    const navigate=useNavigate();

    const handleDelete=async()=>{
        try{
            const response=await Axios({...summaryApi.delete_subcategory,data:{id}})
            if(response.data.success)
            {
                toast.success(response.data.message);
                close();
                fetchSubCategory()
            }

        }
        catch(error)
        {
            console.log(error)
            AxiosError(error)
        }
    }
  return (
    <div className='bg-black fixed inset-0 bg-opacity-50 justify-center items-center flex'>
      
      <div className='bg-white min-w-[400px] p-6'>
<div className='flex justify-between place-items-center mb-4'>
    <p>Delete SubCategory</p>
    <RxCross2 onClick={close} size={23}/>
</div>
<div className='space-y-4'>
<p>Are You Sure to delete this subcategory?</p>
<div className='flex gap-4 items-center'>
    <Button className='bg-black font-medium text-xl ' onClick={()=>navigate("/dashboard/subcategory")}>Cancel</Button>
    <Button className='bg-red-600 text-white text-xl' onClick={handleDelete}>Delete</Button>
</div>
</div>
      </div>
    </div>
  )
}

export default DeleteSubCategory
