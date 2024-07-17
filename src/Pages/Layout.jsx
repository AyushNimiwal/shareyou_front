import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import ToolBar from './ToolBar.jsx'

function Layout() {
  return (
    <div className='w-screen h-screen relative'>
      <Navbar />
      <Outlet />
      <ToolBar/>
    </div>
  )
}

export default Layout