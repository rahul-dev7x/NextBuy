import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Axios from "@/utills/Axios";
import summaryApi from "@/common/SummaryApi";
import AxiosError from "@/utills/AxiosError";


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({

        email: "",


    });




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

        try {
            const response = await Axios({ ...summaryApi.forgot_password, data: formData });
            //console.log(response)
            const data = response.data;
            if (data.success) {
                
                toast.success(data.message)
                navigate("/otp-verification",{
                    state:formData
                })
                setFormData({

                    email: ""
                })
            }
            else {
                toast.error(data.message);
            }

        }
        catch (error) {
            AxiosError(error)
        }
    };

    //console.log(isCheckboxChecked)
    const isFormValid =
        formData.email.length > 0;

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-center mb-6 font-bold text-2xl text-gray-800">
                    Forgot Password
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
                            autoFocus
                            placeholder="johndoe@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>






                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={!isFormValid}>Send OTP
                    </Button>
                </form>

                <div className="flex justify-end mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account? {" "}
                        <span className="text-blue-600 hover:underline">
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;