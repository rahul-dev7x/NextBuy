import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '../ui/button'
import AxiosError from '@/utills/AxiosError'
import Axios from '@/utills/Axios'
import summaryApi from '@/common/SummaryApi'
import { toast } from 'sonner'

const DeleteCategory = ({close,fetchCategory,deleteData}) => {
  const [dData,setdData]=useState(deleteData || "")
  console.log("ddata",dData)
  const handleSubmit=async()=>{
try{
const response=await Axios({...summaryApi.delete_category,data:dData})
if(response.data.success)
{
  toast.success(response.data.message);
  close()
  fetchCategory()
}
else{
  toast.error(response.data.message)
}
}
catch(error)
{
  AxiosError(error)
}
  }
  return (
    <div className='bg-black fixed bg-opacity-50 z-50 inset-0 flex justify-center items-center'>
      <div className='w-[400px] shadow-md rounded-lg p-6 bg-white'>
        <div className='flex justify-between items-center'>
          <h1 className='font-medium text-xl'>Delete Category</h1>
          <RxCross2 size={20} className='cursor-pointer' onClick={close}/>
        </div>
        <div>
          <h1>Are You Sure to delete category</h1>
          <Button  className='bg-red-600 text-white text-xl' onClick={handleSubmit}>Delete</Button>

        </div>

      </div>
    </div>
  )
}

export default DeleteCategory
