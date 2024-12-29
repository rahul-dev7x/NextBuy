import summaryApi from "@/common/SummaryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Axios from "@/utills/Axios";
import AxiosError from "@/utills/AxiosError";
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const OtpVerification = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!(location?.state?.email)) {
      navigate("/forgot-password")
    }
  }, [])

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    //console.log(index, value);
    if (/^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      //console.log(newOtp);
      newOtp[index] = value;
      setOtp(newOtp);
    }
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    //console.log(otp)


  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryApi.otp_verification, data: {
          otp: otp.join(""),
          email: location?.state?.email
        }
      })
      const data = response.data;
      if (data.success) {

        toast.success(data.message)
        navigate("/reset-password", {
          state: {
            data: data,
            email: location?.state?.email
          }
        })
      }
      else {
        toast.error(data.message);
      }

    }
    catch (error) {
      AxiosError(error)
    }
  }


  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center mb-6 font-bold text-2xl text-gray-800">OTP Verification</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-4 mb-4">
            {
              otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}

                />
              ))
            }
          </div>
          <Button type="submit" className="w-full bg-indigo-600 text-white hover-bg-indigo-700">Verify OTP</Button>
        </form>
      </div>
    </div>
  )
}

export default OtpVerification
