import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import { createReadableUrl } from '@/utills/readableUrl';


const ProductListPage = () => {
  const params = useParams();
  console.log("params", params)
  const { category } = useSelector(state => state.category);
  const allSubCategory = useSelector(state => state.subcategory.subCategory);
  console.log("subcategory", allSubCategory)

  const [displaySubCategory, setDisplaySubCategory] = useState([])




  const categoryId = params.category.split("-").slice(-1)[0];
  //console.log(categoryId)
  const subCategoryId = params.subcategory.split("-").slice(-1)[0];
  // console.log(subCategoryId)
  const subCategory = params?.subcategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory.length - 1).join(" ");
  console.log("name", subCategoryName)

  console.log("display_sub_category", displaySubCategory)


  useEffect(() => {
    const sub = allSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id === categoryId
      })
      // console.log("filter_data",filterData)
      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)



  }, [params, allSubCategory])

  return (
    <div className=''>
      <Header />
      {/* Subcategry Section */}
      <div className='mt-24  flex  sticky top-24'>


        <div className='min-w-52 min-h-screen bg-white p-6 sticky left-2 overflow-y-scroll flex gap-4 flex-col '>
          {
            displaySubCategory.map((sub, index) => {
              const url = `/${createReadableUrl(sub.category[0].name)}-${sub.category[0]._id}/${createReadableUrl(sub.name)}-${sub._id}`;
              return (
                <Link to={url} key={index} className={` rounded-md gap-4 flex items-center hover:bg-blue-100 cursor-pointer border-b ${subCategoryId === sub._id ? "bg-blue-300 hover:bg-blue-300" : ""}`} >
                  <div className='w-fit max-w-28 mx-0 rounded p-3'>

                    <img src={sub.image} className='h-14 w-full object-scale-down' />
                  </div>
                  <p>{sub.name}</p>

                </Link>
              )
            })
          }

        </div>
        {/* Product Section */}
        <div className=' flex-1  sticky top-24 mx-6 flex flex-col'>
          <div className='p-4 shadow-md mb-6 font-bold text-xl'>
            {subCategoryName}
          </div>
          <div>
            proddd
          </div>




        </div>
      </div>


    </div>
  )
}

export default ProductListPage
