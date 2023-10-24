import React from 'react'
import { Outlet } from 'react-router-dom';
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div className='UserLayout'>
        <Outlet/>
    </div>
  )
}

export default UserLayout