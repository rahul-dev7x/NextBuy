import summaryApi from "@/common/SummaryApi"
import Axios from "./Axios"
import AxiosError from "./AxiosError"





const uploadImage=async(file:File)=>{
    try{
        const formData=new FormData();
        formData.append("image",file)
      const response=await Axios({...summaryApi.upload_image,data:formData})
  return response;
    }
    catch(error)
    {
      AxiosError(error)
    }
  }


  export default uploadImage;