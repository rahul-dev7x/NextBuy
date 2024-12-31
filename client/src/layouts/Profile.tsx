import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Profile = () => {
  const [activePath, setActivePath] = useState("/profile/edit")
  const navigate = useNavigate()
  const menuItems = [
    { name: "Edit Profile", path: "/profile/edit" },
    {
      name: "My Address", path: "/profile/address"
    },
    { name: "My Orders", path: "/profile/orders" }
  ]
  const handleNavigation = (path: string) => {
    setActivePath(path);
    navigate(path);
  }
  return (
    <div className='w-full flex h-screen bg-gray-100'>
      <div className='shadow-md w-64 bg-white p-4 flex flex-col h-full fixed'>
        <aside>
          <nav>
            <ul className='space-y-4'>
              {
                menuItems.map((item, index) => (
                  <li key={index} onClick={() => handleNavigation(item.path)} className={`p-3 text-lg rounded-lg  cursor-pointer ${activePath === item.path ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100 "}`}>
                    {item.name}
                  </li>
                ))
              }
            </ul>
          </nav>
        </aside>
      </div>
      {/* Right side */}
      <div className='flex-1 ml-64 p-8 h-screen overflow-y-auto bg-white'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile
