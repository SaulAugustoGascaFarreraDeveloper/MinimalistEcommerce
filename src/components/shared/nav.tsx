"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps, ReactNode } from 'react'

const Nav = ({children} : {children: ReactNode}) => {
  return (
    <nav className='bg-primary text-primary-foreground flex justify-center px-4'>
        {children}
    </nav>
  )
}


const NavLink = (props: Omit<ComponentProps<typeof Link>,"className">) => {

    const pathname = usePathname()

    return <Link {...props} className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible::bg-secondary focus-visible::text-secondary-foreground",
        pathname === props.href && "bg-background text-secondary-foreground"
        )} >
    </Link>
}

export {Nav,NavLink}