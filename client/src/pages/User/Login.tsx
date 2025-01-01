import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import Axios from "@/utills/Axios";
import summaryApi from "@/common/SummaryApi";
import AxiosError from "@/utills/AxiosError";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth-slice";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const [passwordEye, setPasswordEye] = useState(false);



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
      const response = await Axios({ ...summaryApi.login, data: formData });
      //console.log(response)
      const data = response.data;
      if (data.success) {
        setFormData({

          email: "",
          password: ""
        })
        dispatch(setUser(data.data.loginData))
        toast.success(data.message)
        if (data.data.loginData.role === "USER") {
          navigate("/")
        }
        else {
          navigate("/dashboard/category")
        }
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
    formData.password.length > 0;

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center mb-6 font-bold text-2xl text-gray-800">
          Login on NextBuy
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

          <div className="mb-1">
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
          <div className="flex justify-end mb-2">
            <p><Link to="/forgot-password">Forget Password?</Link></p>
          </div>




          <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={!isFormValid}>Login
          </Button>
        </form>

        <div className="flex justify-end mt-4">
          <p className="text-sm text-gray-600">
            New to NextBuy? {" "}
            <span className="text-blue-600 hover:underline">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;