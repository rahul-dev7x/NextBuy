import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import Axios from "@/utills/Axios";
import summaryApi from "@/common/SummaryApi";
import AxiosError from "@/utills/AxiosError";


const ResetPassword = () => {
    const navigate = useNavigate()
    const location=useLocation();
   // console.log(location)
    const [formData, setFormData] = useState({
       
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
   
useEffect(()=>{
if(!(location?.state?.email))
{
  navigate("/forgot-password")
}
if(location?.state?.email)
{
  setFormData((prev)=>({
    ...prev,email:location?.state?.email
  }))
}
},[])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(formData);
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Password and Confirm Password Does Not Matching")
            return
        }
        try {
            const response = await Axios({ ...summaryApi.reset_password, data: formData });
            //console.log(response)
            const data = response.data;
            if (data.success) {
               
                toast.success(data.message)
                navigate("/")
                setFormData({
                    
                  email: "",
                  newPassword: "",
                  confirmPassword: ""
              })
            }
            else
            {
                toast.error(data.message)
            }

        }
        catch (error) {
            AxiosError(error)
        }
    };

    //console.log(isCheckboxChecked)
    const isFormValid = formData.newPassword === formData.confirmPassword &&
        formData.newPassword.length > 0

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-center mb-6 font-bold text-2xl text-gray-800">
Reset Password
                </h1>
                <form onSubmit={handleSubmit}>
                    

                    <div className="mb-4">
                        <Label htmlFor="email" className="font-medium text-gray-700 text-sm">
                            Email:
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johndoe@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" className="font-medium text-gray-700 text-sm">
                            New Password:
                        </Label>
                        <div className="relative flex items-center mt-1">
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type={passwordEye ? "text" : "password"}
                                placeholder="*****"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full pr-10"
                            />
                            <div
                                onClick={() => setPasswordEye((prev) => !prev)}
                                className="absolute right-3 text-gray-500 cursor-pointer"
                            >
                                {passwordEye ? <FaEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="confirmPassword" className="font-medium text-gray-700 text-sm">
                            Confirm Password:
                        </Label>
                        <div className="relative flex items-center mt-1">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={confirmPasswordEye ? "text" : "password"}
                                placeholder="*****"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pr-10"
                            />
                            <div
                                onClick={() => setConfirmPasswordEye((prev) => !prev)}
                                className="absolute right-3 text-gray-500 cursor-pointer"
                            >
                                {confirmPasswordEye ? <FaEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                  

                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={!isFormValid}>
                        Register Now
                    </Button>
                </form>

               </div>
        </div>
    );
};

export default ResetPassword;

