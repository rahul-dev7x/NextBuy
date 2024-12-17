import { AiOutlineLogin } from "react-icons/ai"
import Search from "./Search"

import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom"


const Header = () => {
    return (
        <>
            <header className="h-20 shadow-md px-6 py-4 flex sticky bg-white top-0 z-50 mx-auto ">
                <div className="flex justify-between items-center gap-5 w-full px-20">
                    {/* Logo Section */}
                    <Link to={"/"}>
                    
                    <div className="text-2xl font-bold text-blue-500 ">
                        <h2>Next<span className="text-yellow-300">Buy</span></h2>
                    </div>

                    </Link>
                    
                    {/* Search Section */}
                    <div className="">

                        <Search />
                    </div>

                    {/* Cart and Login Section */}
                    <div className="flex items-center gap-6 text-black-200 text-lg">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                            <AiOutlineLogin size={24}/>
                            <p>Login</p>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                            <IoCartOutline size={24}/>
                            <p>Cart</p>
                        </div>


                    </div>
                </div>

            </header>
        </>
    )
}

export default Header
