"use client";

import { SidebarTrigger } from '@/components/ui/sidebar'
// import { UserAvatar } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppHeader = () => {
  return (
    <div className='flex items-center justify-between w-full
    p-4 shadow bg-sidebar'>
      <SidebarTrigger/>
      {/* <UserAvatar/> */}
      <UserButton/>
    </div>
  )
}

export default AppHeader
