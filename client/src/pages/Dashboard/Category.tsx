import CreateCategoryModal from '@/components/shared/CreateCategoryModal'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const Category = () => {
  const [isOpenModal,setIsOpenModal]=useState(false)
  return (
    <div>
      {/* Upper side */}
      <div className='bg-white shadow-md w-full rounded-md p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl '>Category</h1>
          <Button onClick={()=>setIsOpenModal(true)}>Create Category</Button>
        </div>
      </div>
      {/* Down Side */}
      <div>

      </div>
      {
        isOpenModal && (<CreateCategoryModal close={()=>setIsOpenModal(false)}
        />)
      }
    </div>
    
  )
}

export default Category
