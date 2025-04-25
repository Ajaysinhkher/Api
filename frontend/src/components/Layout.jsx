import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
