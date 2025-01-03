import summaryApi from '@/common/SummaryApi'
import CreateSubCategoryModal from '@/components/shared/CreateSubCategoryModal'
//import EditSubCategoryModal from '@/components/shared/EditSubCategoryModal'
import SubCategoryCard from '@/components/shared/SubCategoryCard'
import { Button } from '@/components/ui/button'
import { setSubCategory } from '@/redux/subcategory'
import Axios from '@/utills/Axios'
import AxiosError from '@/utills/AxiosError'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const SubCategory = () => {
  const [isCreateCategoryOpen,setIsCreateCategoryOpen]=useState(false);
  // const [isEditOpen,setIsEditOpen]=useState(false)
  const dispatch=useDispatch();
  const {subCategory}=useSelector(state=>state.subcategory)
  console.log("subcategory_slice",subCategory)
  const fetchSubCategory=async()=>{
    try{
      const response=await Axios({...summaryApi.all_subcategory})
      console.log("fetch_all_subc",response);
      if(response.data.success)
      {
        dispatch(setSubCategory(response.data.data))
      }

    }
    catch(error)
    {
      AxiosError(error);
    }
  }
  useEffect(()=>{
fetchSubCategory();
  },[])
  return (
    <div className='flex flex-col h-screen'>
      <div className=' bg-white w-full shadow-md rounded-lg p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='font-medium text-lg'>Sub category</h1>
          <Button className="bg-blue-500 hover:bg-white hover:text-black hover:transition duration-300 ease-in-out delay-110" onClick={()=>setIsCreateCategoryOpen(true)}>Create Subcategory</Button>
        </div>
      </div>
      <div className='mt-4 bg-white p-4 shadow-md rounded-lg '>
        {
          subCategory.length>0?( <SubCategoryCard fetchSubCategory={fetchSubCategory} subCategory={subCategory} open={()=>setIsEditOpen(true)}/>):(<h1>No SubCategory Found</h1>)
        }
       
      </div>

{
  isCreateCategoryOpen && (
    <CreateSubCategoryModal close={()=>setIsCreateCategoryOpen(false)} fetchSubCategory={fetchSubCategory}/>
  )
}

    </div>
  )
}

export default SubCategory
