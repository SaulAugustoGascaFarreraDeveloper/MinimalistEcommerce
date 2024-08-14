"use client"
import React, { useState } from 'react'
import PageHeader from '../../_components/page-header'
import { useProducts } from '@/hooks/products/use-products'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { format } from 'util'
import { formatCurrency } from '@/lib/formatters'

const NewProductPage = () => {

const {errors,register,loading,onSubmitProduct,isSuccess} = useProducts()


const [priceInCents,setPriceInCents] = useState<number>(0)

  return (
    <>
        <PageHeader>
            Add Product
        </PageHeader>
        <form onSubmit={onSubmitProduct} className='flex flex-col gap-4' >
                <Input 
                    type='text'
                    {...register('name')}
                    placeholder='Type the product name'
                    disabled={loading}

                />
                 <Input 
                    type='text'
                    {...register('description')}
                    placeholder='Type the description of the product'
                    disabled={loading}
                    
                />
                 <Input 
                    type='number'
                    {...register('priceInCents')}
                    placeholder='Set price in cents'
                    disabled={loading}
                    
                    onChange={(e) => setPriceInCents(Number(e.target.value))}
                />
                <div className='text-muted-foreground'>
                    {formatCurrency((priceInCents || 0)/ 100)}
                </div>
                 <Input 
                    type='file'
                    {...register('filePath')}
                    disabled={loading}
                    
                />

                <Input 
                    type='file'
                    {...register('imagePath')}
                    disabled={loading}
                    
                />
                

                <Button type='submit' disabled={loading}  >
                    {loading ? <Loader2 className='animate-spin' />  : "Crear producto"}
                </Button>
                
        </form>

        {isSuccess && redirect("/admin/products")}
    </>
  )
}

export default NewProductPage