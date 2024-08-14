"use client"

import { onAddProduct } from "@/actions/producs"
import { useToast } from "@/components/ui/use-toast"
import { ProductSchema, ProductSchemaProps } from "@/schemas/products.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"


export const useProducts =  () => {
    const {register,formState:{errors},handleSubmit,reset} = useForm<ProductSchemaProps>({
        resolver: zodResolver(ProductSchema)
    })

    const [loading,setLoading] = useState<boolean>(false)
    const [isSuccess,setIsSuccess] = useState<boolean>(false)

    const {toast} = useToast()

    const onSubmitProduct = handleSubmit(async (value) => {

        setLoading(true)

       //const [file] = value.filePath

       const formData = new FormData();
        formData.append("name", value.name);
        formData.append("description", value.description);
        formData.append("priceInCents", value.priceInCents.toString());
        formData.append("filePath", value.filePath[0]);  
        formData.append("imagePath",value.imagePath[0])

        const product = await onAddProduct(formData)

        console.log(product)

        if(product)
        {
            reset()

            toast({
                title: 'Success',
                description: product.message,
            })

            setLoading(false)

            setIsSuccess(true)
        }

    })


    return {register,errors,onSubmitProduct,loading,isSuccess}
}