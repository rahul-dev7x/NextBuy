
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import uploadImage from '@/utills/uploadImage'
import { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { Button } from '@/components/ui/button';
import AddField from '@/components/shared/AddField';
const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {}
  })
  const { category } = useSelector(state => state.category);
  const { subCategory } = useSelector(state => state.subcategory);
  console.log("all_category", category);
  console.log("sub_category", subCategory)

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  // const [selectCategory,setselectCategory]=useState("")


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }
  console.log(data)





  const handleImageChange = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return
    }
    setIsLoading(true)
    const response = await uploadImage(file);
    console.log(response);
    const imageURL = response?.data.data;
    setData((prev) => {
      // console.log("prev_data",prev)
      return {
        ...prev, image: [...prev.image, imageURL]
      }
    })
    setIsLoading(false)

  }



  const handleDeleteImage = (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })
  }



  const handleCatDelete = (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })
  }
  const handleDeleteSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })

  }

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev, more_details: {
          ...prev.more_details, [fieldName]: ""
        }
      }
    })
    setFieldName("");
    setIsOpen(false);
  }



  return (
    <section className="">
      <div className=" bg-white rounded-md shadow-md flex items-center justify-center p-6">
        <h2 className="font-semibold text-center">Upload Product</h2>
      </div>
      <div className='mt-4 bg-white shadow-md rounded flex'>
        <form className='flex-col space-y-4 p-6 '>
          <div className='min-w-[600px] bg-white'>
            <Label htmlFor='name'>Name:</Label>
            <Input type='text' id='name' name='name' placeholder='Enter Product Name' value={data.name} onChange={handleChange} className='mt-2 w-full' />
          </div>
          <div className='mt-4 flex flex-col gap-2'>
            <Label htmlFor='description' className='font-medium'>Description:</Label>
            <textarea
              id='description'
              typeof='text'
              placeholder='Enter Product Description'
              name='description'
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className='p-2 border'


            />
          </div>
          {/* Image */}
          <div>
            <p>Image:</p>
            <div>
              <div className='border h-24 flex justify-center items-center '>
                <Label htmlFor='uploadImage' className='cursor-pointer font-bold'>{isLoading ? "...Uploading Image" : "Upload Image"}
                </Label>
                <Input type='file' accept='image/*' name="image" id='uploadImage' className='hidden' onChange={handleImageChange} />
              </div>
              <div className='mt-4 shadow-lg rounded-md grid grid-cols-4 gap-4 w-full p-6 shadow-gray-300 '>
                {
                  data.image.map((img, index) => (
                    <div key={index} className='relative group cursor-pointer'>
                      <img src={img} className='h-24 w-24' />
                      <div className='hidden absolute bottom-0  bg-red-900 group-hover:block' onClick={() => handleDeleteImage(index)}>
                        <MdDeleteOutline />
                      </div>
                    </div>

                  ))
                }

              </div>
            </div>

          </div>
          {/* Category */}
          <div>
            <Label>Category:</Label>
            <div>
              <div>
                <select onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return;
                  //console.log("value",value)

                  const selectedCategory = category.find((cat) => cat._id === value);
                  if (!selectedCategory)
                    return;
                  const isAlreadyAdded = data.category.some((cat) => cat._id === selectedCategory._id);
                  if (!isAlreadyAdded) {
                    setData((prev) => {
                      return {
                        ...prev, category: [...prev.category, selectedCategory]
                      }
                    })
                  }

                }}>
                  <option value={""}>Select Category</option>
                  {
                    category.map((c, index) => {
                      return (
                        <option value={c._id} key={index}>{c.name}</option>
                      )
                    })
                  }
                </select>
                <div className=' grid grid-cols-8 gap-3'>
                  {
                    data.category.map((cat, index) => {
                      return (
                        <div key={index} className='flex justify-between items-center gap-3 bg-gray-100 shadow-md rounded-sm p-2 cursor-pointer'>
                          <p>{cat.name}</p>
                          <RxCross2 onClick={() => handleCatDelete(index)} className='cursor-pointer' />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

          </div>
          {/* Subcategory */}
          <div className='mt-2'>
            <p className='font-semibold text-sm'>SubCategory:</p>
            <div className='flex flex-col gap-3'>
              <div>
                <select onChange={(e) => {
                  const value = e.target.value;
                  // console.log(value);
                  if (!value)
                    return
                  const selectedSubCategory = subCategory.find((cat) => cat._id === value);
                  if (!selectedSubCategory)
                    return
                  const isAlreadySelected = data.subCategory.some((cat) => cat._id === selectedSubCategory._id);
                  if (!isAlreadySelected) {
                    setData((prev) => {
                      return {
                        ...prev, subCategory: [...prev.subCategory, selectedSubCategory]
                      }
                    })
                  }

                }}>
                  <option value={""}>Select SubCategory</option>
                  {
                    subCategory.map((sub, index) => {
                      return (
                        <option value={sub._id}>{sub.name}</option>
                      )
                    })
                  }
                </select>


              </div>
              <div className='grid grid-cols-8 gap-3'>
                {
                  data.subCategory.map((sub) => (
                    <div className='flex p-2 shadow-md items-center gap-2 cursor-pointer'>
                      <p>{sub.name}</p>
                      <RxCross2 onClick={() => handleDeleteSubCategory(sub._id)} className='cursor-pointer' />
                    </div>
                  )

                  )
                }
              </div>
            </div>

          </div>
          {/* Unit */}
          <div>
            <Label>Unit:</Label>
            <Input type='text' name='unit' value={data.unit} onChange={handleChange} />
          </div>
          {/* Stock */}
          <div>
            <Label>Stcok:</Label>
            <Input type='text' name="stock" value={data.stock} />

          </div>
          {/* Price */}
          <div>
            <Label>Price:</Label>
            <Input type='text' name='price' value={data.price} onChange={handleChange} />

          </div>
          {/* Discount */}
          <div>
            <Label>Discount:</Label>
            <Input type='text' name='discount' value={data.discount} onChange={handleChange} />

          </div>
          {
            Object.keys(data?.more_details).map((k,index)=>{
              return(
                <div className='grid gap-2'>
                  <Label>{k}:</Label>
                  <Input type='text' value={data?.more_details.k} onChange={(e)=>{
                    const value=e.target.value;
                    setData((prev)=>{
                      return{
                        ...prev,more_details:{
                          ...prev.more_details,[k]:value
                        }
                      }
                    })
                  }}/>
                </div>
              )

            })
          }
          {/* More Field */}
          <div>
            <Button className='bg-blue-500 transition ease-in-out duration-200 hover:bg-white hover:text-blue-600 hover:border-2 hover:outline-none font-semibold text-sm' onClick={() => setIsOpen(true)}>Add More Field</Button>
          </div>


        </form>
        {
          isOpen && (
            <AddField close={() => setIsOpen(false)} value={fieldName} onChange={(e) => { setFieldName(e.target.value); console.log(fieldName) }} submit={handleAddField} />
          )
        }
      </div>


    </section>
  )
}

export default UploadProduct
