import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import Axios from "@/utills/Axios";
import summaryApi from "@/common/SummaryApi";
import AxiosError from "@/utills/AxiosError";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)

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
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password and Confirm Password Does Not Matching")
            return
        }
        try {
            const response = await Axios({ ...summaryApi.register, data: formData });
            //console.log(response)
            const data = response.data;
            if (data.success) {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                toast.success(data.message)
                navigate("/login")
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
    const isFormValid = formData.password === formData.confirmPassword &&
        formData.password.length > 0 &&
        isCheckboxChecked;

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-center mb-6 font-bold text-2xl text-gray-800">
                    Register on NextBuy
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name" className="font-medium text-gray-700 text-sm">
                            Name:
                        </Label>
                        <Input
                            id="name"
                            autoFocus
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

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
                            Password:
                        </Label>
                        <div className="relative flex items-center mt-1">
                            <Input
                                id="password"
                                name="password"
                                type={passwordEye ? "text" : "password"}
                                placeholder="*****"
                                value={formData.password}
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

                    <div className="flex items-center mb-4">
                        <Checkbox id="terms" className="mr-2" checked={isCheckboxChecked} onCheckedChange={(checked) => setIsCheckboxChecked(!!checked)} />
                        <Label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to NextBuy's terms and policies.
                        </Label>
                    </div>

                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={!isFormValid}>
                        Register Now
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

export default Register;