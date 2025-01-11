import { Link } from "react-router-dom";
import { Button } from "../ui/button"
import Search from "./Search"
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import DropDown from "./DropDown";

const Header = () => {
  const {isAuthenticated,user}=useSelector(state=>state.auth);
  console.log(user);
  return (
    <div className="w-full fixed top-0 shadow-md bg-white z-50 ">
      <div className="flex justify-between items-center p-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="font-bold text-4xl text-gray-700">Plan<span className="text-4xl font-bold text-yellow-500">ora</span></h1>

          </Link>

        </div>
        {/* Search Section */}
        <div>
          <Search />
        </div>
        {/* logina aND CART */}
        <div className="flex justify-between items-center gap-6">
          <div>
            {
              isAuthenticated?(<DropDown user={user}/>):(

<Link to="/login">
            <Button className="text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 text-xl font-semibold">Login</Button>
            </Link>
              )
            }
            
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaCartArrowDown size={28} />
            <p className="font-bold text-2xl text-gray-900">Cart</p>
          </div>

        </div>



      </div>

    </div>
  )
}

export default Header
