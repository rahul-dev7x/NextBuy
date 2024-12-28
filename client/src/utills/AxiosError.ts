import { toast } from "sonner"


const AxiosError=(error:any)=>{
    toast.error(error?.response?.data?.message)
}
export default AxiosError;