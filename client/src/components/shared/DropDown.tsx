import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//import { useSelector } from "react-redux"
import { CgProfile } from "react-icons/cg";
import AxiosError from "@/utills/AxiosError";
import Axios from "@/utills/Axios";
import summaryApi from "@/common/SummaryApi";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const DropDown = ({ user }) => {
  //const {user}=useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      const response = await Axios({ ...summaryApi.logout })
      if (response.data.success) {
        dispatch(logout());
        toast.success(response.data.message)
      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (error) {
      AxiosError(error)
    }
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">

          <Avatar>
            <AvatarImage src={user?.avatar || <CgProfile />} />
            <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>


        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate("/profile/edit")}>My Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer"><p onClick={handleLogout}>Logout</p></DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default DropDown
