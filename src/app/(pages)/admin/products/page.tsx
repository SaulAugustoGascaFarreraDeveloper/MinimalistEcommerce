
import React, { useEffect, useState } from 'react'
import PageHeader from '../_components/page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, MoreVertical, Plus, XCircle } from 'lucide-react'
import { Table, TableHeader, TableRow,TableHead, TableBody, TableCell } from '@/components/ui/table'
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { Product } from '@prisma/client'
import { onGetAllProducts } from '@/actions/producs'
import { unknown } from 'zod'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'

const ProductsPage = () => {
  return (
    <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>
                Products
            </PageHeader>
            <Button asChild>
                <Link href={`/admin/products/new`} className=''>
                    Add Product <Plus className='ml-1' />
                </Link>
            </Button>
        </div>

        <ProductsTable />
       
    </>
  )
}


const ProductsTable = async () => {


    //const [products,setProducts] = useState<Product[]>()


   
       

        const products = await db.product.findMany(
            {
                select:{
                id: true,
                name: true,
                priceInCents: true,
                isAvailableForPurchase: true,
            _count:{
                select:{
                    orders: true
                }
                },
                },
                orderBy:{
                    name: 'asc'
                }
        })

       

        if(products.length === 0) return(
            <p>
                No Products found.
            </p>
        )
    
   

   

  

    return (<Table className='mt-8'>
        <TableHeader>
            <TableRow>
                <TableHead className='w-0'>
                    <span className='sr-only'>Available for Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className='w-0'>
                    <span className='sr-only'>Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products?.map((data,i) => (
                <TableRow key={data.id} >
                        <TableCell>
                            {data.isAvailableForPurchase ? <>
                                <CheckCircle2 />
                                <span className='sr-only' >Available</span>
                            </> : <>
                            <span className='sr-only' >Unavailable</span>
                                <XCircle />
                            </>}
                        </TableCell>
                        <TableCell>
                            {data.name}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(data.priceInCents / 100)}
                        </TableCell>
                        {/* <TableCell>
                            {formatNumber(data._count.orders)}
                        </TableCell> */}
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className='sr-only' >Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${data.id}/download`}>
                                            Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link download href={`/admin/products/${data.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                           
                            </DropdownMenu>
                           
                        </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>)
}

export default ProductsPage