import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import AxiosError from '@/utills/AxiosError';
import Axios from '@/utills/Axios';
import summaryApi from '@/common/SummaryApi';


type CreateCategoryModalProps = {
    close: () => void;
};
const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ close,fetchCategory }) => {
    const [formData, setFormData] = useState<{
        category: string;
        category_image: File | null;
    }>({
        category: "",
        category_image: null
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({ ...formData, category_image: file });
    }
    //console.log(formData);
    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("category", formData.category);
        if (formData.category_image) {
            formdata.append("category_image", formData.category_image);
        }
        try {
            const response = await Axios({ ...summaryApi.create_category, data: formdata })
            console.log(response)
            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                close()
                fetchCategory();
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error) {
            AxiosError(error)
        }
    }

    return (
        <div className="bg-black fixed bg-opacity-50 inset-0 z-50 flex justify-center items-center">
        <form
          onSubmit={handleUpload}
          className="bg-white w-[400px] shadow-lg rounded-md p-6"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">Create Category</h1>
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
                name="category"
                className="mt-2"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className={`${
                formData.category_image ? "justify-between items-center flex" : ""
              } p-4`}
            >
              <div>
                {formData.category_image && (
                  <img
                    src={URL.createObjectURL(formData.category_image)}
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
                  name="category_image"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={!formData.category}
                  required
                />
              </div>
            </div>
          </div>
  
          <Button
            type="submit"
            className="bg-blue-500 text-white w-full mt-4"
            disabled={!formData.category || !formData.category_image}
          >
            Create Category
          </Button>
        </form>
      </div>
    )
}

export default CreateCategoryModal

