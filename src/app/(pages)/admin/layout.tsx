import {Nav, NavLink} from '@/components/shared/nav'
import React, { ReactNode } from 'react'

export const dynamic = "force-dynamic"

type AdminLayout = {
    children: ReactNode
}

const AdminLayout = ({children} : AdminLayout) => {
  return (
    <>
        <Nav>
            <NavLink href={'/admin'} >
                Dashboard
            </NavLink>
            <NavLink href={'/admin/products'} >
                Products
            </NavLink>
            <NavLink href={'/admin/users'} >
                Customers
            </NavLink>
            <NavLink href={'/admin/orders'} >
                Sales
            </NavLink>
        </Nav>

        <div className="container my-6">
            {children}
        </div>
    </>
  )
}

export default AdminLayout