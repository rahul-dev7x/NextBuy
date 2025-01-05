








import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import Axios from '@/utills/Axios';
import summaryApi from '@/common/SummaryApi';
import { toast } from 'sonner';
import subcategory from '@/redux/subcategory';


const EditSubCategoryModal = ({ close, editData, fetchSubCategory }) => {
  const categoryId = editData.category.map((cat) => cat._id);
  //console.log("categoryid",categoryId);
  console.log("edit_data", editData)

  const [data, setData] = useState({
    subCategoryName: editData.name || '',
    subcategoryId: editData._id,
    image: editData.image || null,
    categories: categoryId,
  });









  const { category } = useSelector((state) => state.category);
  console.log(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData({ ...data, image: file });
  };

  const handleCategorySelect = (categoryId: string) => {
    const isCategoryPresent = data.categories.includes(categoryId);
    if (!isCategoryPresent) {
      setData({ ...data, categories: [...data.categories, categoryId] });
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setData({
      ...data,
      categories: data.categories.filter((id) => id !== categoryId),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", data.subCategoryName);



    formData.append("categories", JSON.stringify(data.categories))


    formData.append("id", data.subcategoryId)

    if (data.image) {
      formData.append("image", data.image)
    }
    try {
      const response = await Axios({ ...summaryApi.update_subcategory, data: formData });
      //console.log(response)
      const data = response.data;
      if (data.success) {
        toast.success(data.message)
        close();
        fetchSubCategory()
      }
      else {
        toast.error(data.message)
      }

    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='fixed bg-black flex justify-center items-center bg-opacity-50 inset-0'>
      <div className='min-w-[400px] bg-white p-6'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center mb-4'>
            <h1>SubCategory</h1>
            <RxCross2 size={24} onClick={close} className='cursor-pointer' />
          </div>
          <div className=''>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='my-2'>
                <Label>Subcategory</Label>
                <Input
                  type='text'
                  name='subCategoryName'
                  value={data.subCategoryName}
                  onChange={handleChange}
                />
              </div>

              <div className='flex items-center gap-4'>
                <div>
                  {data.image && (
                    <img
                      src={
                        typeof data.image === 'string'
                          ? data.image
                          : data.image instanceof File
                            ? URL.createObjectURL(data.image)
                            : ''
                      }
                      alt='subcategory-image'
                      className='object-cover w-24 h-24'
                    />
                  )}
                </div>
                <Button>
                  <label htmlFor='uploadSubcategory'>Upload Image</label>
                </Button>
                <Input
                  type='file'
                  className='hidden'
                  id='uploadSubcategory'
                  onChange={handleImageChange}
                />
              </div>

              <div className='my-2'>
                <Label>Selected Categories:</Label>
                <div className='grid grid-cols-4 gap-2 mt-2'>
                  {data.categories.map((cat, index) => {
                    const selectedCategory = category.find(
                      (data) => data._id === cat
                    );
                    return (
                      <div
                        key={index}
                        className='flex bg-gray-200 items-center gap-2 p-2 rounded-md justify-center'
                      >
                        <span>{selectedCategory?.name}</span>
                        <RxCross2
                          className='cursor-pointer'
                          onClick={() => handleRemoveCategory(cat)}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className='mt-3'>
                  <Label>Update Category:</Label>
                  <div>
                    {category.map((cat, index) => (
                      <Button
                        key={index}
                        className={`${data.categories.includes(cat._id)
                            ? 'bg-blue-700'
                            : 'bg-gray-500'
                          }`}
                        onClick={() => handleCategorySelect(cat._id)}
                      >
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <Button type='submit' className='mt-4 w-full bg-blue-600'>Update SubCategory</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategoryModal;



