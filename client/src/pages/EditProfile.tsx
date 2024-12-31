import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { CircleUser } from 'lucide-react';
import AxiosError from '@/utills/AxiosError';
import summaryApi from '@/common/SummaryApi';
import Axios from '@/utills/Axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAvatar, setUserDetails } from '@/redux/auth-slice';



const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  //console.log("updated user",user)

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user?.avatar || "")
  const [formDataa,setFormDataa]=useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  })
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file))
      //console.log(URL.createObjectURL(file))
    }
  }

  const handleImageUpload = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!profileImage) {
      return
    }
    const formData = new FormData();
    formData.append("avatar", profileImage)
    try {
      const response = await Axios({ ...summaryApi.update_avatar, data: formData })
      const data = response.data;
      //console.log(data)
      if (data.success) {
        toast.success(data.message)
        dispatch(setAvatar(data.avatar))

      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      AxiosError(error);
    }
  }
  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setFormDataa({...formDataa,[name]:value})
  }
  const handleProfileDetailsUpdate=async(e:React.FormEvent)=>
  {
    e.preventDefault()
    const updatedFields: Record<string, any> = {};

    // Add only updated fields to the payload
    Object.keys(formDataa).forEach((key) => {
      if (formDataa[key] !== user[key]) {
        updatedFields[key] = formDataa[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      toast.error('No changes made to update.');
      return;
    }
//console.log("updated fields",updatedFields)
    try{
      const response=await Axios({...summaryApi.update_user,data:updatedFields})
      const data=response.data;
      console.log(data)
      if(data.success && data.updatedUser!==null)
      {
        toast.success(data.message)
        dispatch(setUserDetails(data.updatedUser))
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error)
    {
      console.log(error)
      AxiosError(error)
    }

  }



  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h1 className='text-center text-2xl font-bold text-gray-800 mb-6'>Edit Profile</h1>
      <form>
        <div className='flex flex-col items-center'>
          <div className='mb-4'>
            {imagePreview ? (
              <img src={imagePreview} alt={user?.name.charAt(0).toUpperCase()} className='w-24 h-24 rounded-full object-cover' />
            ) : (<CircleUser size={42} className='text-gray-400' />)}
          </div>
          <Label htmlFor='imageUpload'>Edit Profile Picture</Label>
          <Input type='file' id='imageUpload' className='hidden' accept='image/*' onChange={handleChange} />
          {
            profileImage && (
              <Button onClick={handleImageUpload} className='mt-4'>Upload Image</Button>
            )
          }
        </div>


        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name:
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formDataa.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formDataa.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
              Mobile:
            </Label>
            <Input
              id="mobile"
              name="mobile"
              type="number"
              value={formDataa.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

       
        <Button
          type="submit"
          onClick={handleProfileDetailsUpdate}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </Button>

      </form>
    </div>
  )
}

export default EditProfile
