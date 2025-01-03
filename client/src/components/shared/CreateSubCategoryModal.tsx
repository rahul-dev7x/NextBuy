import { RxCross2 } from 'react-icons/rx'
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosError from '@/utills/AxiosError';
import Axios from '@/utills/Axios';
import summaryApi from '@/common/SummaryApi';
import { toast } from 'sonner';

interface SubCatData {
  subcategory: string;
  image: File | null;
  categories: string[];
}

const CreateSubCategoryModal = ({ close,fetchSubCategory }) => {
  const { category } = useSelector((state: any) => state.category);  // Type your state properly
  console.log(category);

  const [subCatData, setSubCatData] = useState<SubCatData>({
    subcategory: '',
    image: null,
    categories: [],
  });

  console.log(subCatData);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSubCatData({ ...subCatData, image: file });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubCatData({ ...subCatData, [name]: value });
  };

  const handleCategorySelect = (categoryId: string) => {
    if (!subCatData.categories.includes(categoryId)) {
      setSubCatData({ ...subCatData, categories: [...subCatData.categories, categoryId] });
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSubCatData({
      ...subCatData,
      categories: subCatData.categories.filter(id => id !== categoryId),
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("subcategory",subCatData.subcategory);
    if(subCatData.image)
    {
    formdata.append("sub-categoryimage",subCatData.image)
    }
    subCatData.categories.forEach(category => {
        formdata.append("categories", category);
    });
    console.log("formdata",formdata)
    try{
      const response=await Axios({...summaryApi.create_subcategory,data:formdata})
      const data=response.data;
      if(data.success)
      {
        toast.success(data.message);
        close()
        fetchSubCategory()
      }
      else{
       toast.error(data.message)
      }

    }
    catch(error)
    {
      AxiosError(error)
    }
    
  };

  return (
    <div className='fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center'>
      <div className='w-[400px] bg-white p-6 shadow-md rounded-lg'>
        <div className='flex justify-between items-center'>
          <h1>Create Subcategory</h1>
          <RxCross2 size={24} className='cursor-pointer' onClick={close} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className='space-y-4 mt-4'>
            <div>
              <Label>SubCategory:</Label>
              <Input
                type='text'
                name='subcategory'
                value={subCatData.subcategory}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='flex gap-8 items-center p-4'>
              <div className='h-24 w-24 border border-white flex justify-center items-center'>
                {subCatData.image ? (
                  <img
                    src={URL.createObjectURL(subCatData.image)}
                    alt='Subcategory'
                    className='w-24 h-24'
                  />
                ) : (
                  <h1>No Image selected</h1>
                )}
              </div>
              <Button className='bg-blue-600' disabled={!subCatData.subcategory}>
                <Label htmlFor='imageUpload'>Upload Image</Label>
              </Button>

              <Input
                type='file'
                id='imageUpload'
                className='hidden'
                onChange={handleImageChange}
              />
            </div>

            {/* Categories */}
            <div>
              <Label>Categories:</Label>
              <div className='flex flex-wrap gap-2 mt-2'>
                {category.map((cat: any) => (
                  <Button
                    key={cat._id}
                    type='button'
                    className={`text-sm ${
                      subCatData.categories.includes(cat._id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700'
                    }`}
                    onClick={() => handleCategorySelect(cat._id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Categories */}
            {subCatData.categories.length > 0 && (
              <div>
                <Label>Selected Categories:</Label>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {subCatData.categories.map((id) => {
                    const selectedCategory = category.find((cat: any) => cat._id === id);
                    return (
                      <div
                        key={id}
                        className='flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-md'
                      >
                        <span>{selectedCategory?.name}</span>
                        <RxCross2
                          size={16}
                          className='cursor-pointer text-gray-600 hover:text-red-600'
                          onClick={() => handleRemoveCategory(id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              className='w-full mt-4 bg-gray-800'
              disabled={!subCatData.subcategory || subCatData.categories.length === 0}
              type='submit'
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubCategoryModal;
