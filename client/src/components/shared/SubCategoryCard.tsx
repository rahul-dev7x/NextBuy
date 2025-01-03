import React, { useState } from 'react'
import EditSubCategoryModal from './EditSubCategoryModal'
import DeleteSubCategory from './DeleteSubCategory';

const SubCategoryCard = ({ subCategory,fetchSubCategory }) => {
    //console.log("card_data",subCategory)
    const [isEditOpen,setIsEditOpen]=useState(false);
    const [isDeleteOpen,setIsDeleteOpen]=useState(false)
    const [editData,setEditData]=useState(null);
    const [deleteData,setDeleteData]=useState(null)
    //console.log("deletedata",deleteData)
    //console.log("edit_data",editData)
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white norder border-gray-200'>
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">No</th>
                        <th className="px-4 py-2 border">Subcategory Name</th>
                        <th className="px-4 py-2 border">Subcategory Image</th>
                        <th className="px-4 py-2 border">Category Name</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subCategory.map((subcat, index) => (
                            <tr key={subcat._id} className='text-center'>
                                <td className='px-4 py-2 border'>{index + 1}</td>
                                <td className='border'>{subcat.name}</td>
                                <td className='border p-3 flex items-center justify-center'>
                                    <img src={subcat.image} alt={subcat.name} className='w-16 h-16 object-cover rounded' />
                                </td>
                                <td className="border px-4 py-2">
                                    {subcat.category?.map((cat, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-500 text-white rounded-md text-sm font-medium px-2 py-1 m-1 inline-block shadow-sm"
                                        >
                                            {cat.name}
                                        </span>
                                    ))}
                                </td>

                                <td className='px-4 py-2 border'>
                                    <button className='bg-blue-500 text-white px-3 py-1 rounded mr-2' onClick={()=>{setIsEditOpen(true);setEditData(subcat)}}>
                                        Edit
                                    </button>
                                    <button className='bg-red-500 text-white px-3 py-1 rounded' onClick={()=>{setIsDeleteOpen(true);setDeleteData(subcat._id)}}>Delete</button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>

            </table>
            {
  isEditOpen && (
    <EditSubCategoryModal close={()=>setIsEditOpen(false)} editData={editData} fetchSubCategory={fetchSubCategory}/>
  )
}
{
    isDeleteOpen && (
        <DeleteSubCategory fetchSubCategory={fetchSubCategory} close={()=>setIsDeleteOpen(false)} deleteData={deleteData}/>
    )
}

        </div>
    )
}

export default SubCategoryCard
