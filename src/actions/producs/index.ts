"use server"

import db from "@/db/db"
import fs from "fs/promises"

export const onAddProduct = async (formData: FormData) => {

    try{

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const priceInCents = parseInt(formData.get("priceInCents") as string, 10);
        const file = formData.get("filePath") as File | null
        const image = formData.get("imagePath") as File | null


        //File Path
        await fs.mkdir("products",{recursive: true})

        const fp = `products/${crypto.randomUUID()}-${file?.name}`


        await fs.writeFile(fp,Buffer.from(await file!.arrayBuffer()))



         //Image Path
         await fs.mkdir("public/products",{recursive: true})

         const ip = `/products/${crypto.randomUUID()}-${image?.name}`
 
        
         await fs.writeFile(`public${ip}`,Buffer.from(await image!.arrayBuffer()))



        const product = await db.product.create({
            data:{
                name: name,
                priceInCents: priceInCents,
                description: description,
                filePath: fp,
                imagePath: ip,
                isAvailableForPurchase: false
            }
        })

        if(product){
            return {status: 200,message: "Product created succesfully"}

            
        }

        return {status: 400,message: "Oops something went wrong"}

    }catch(error)
    {
        console.log("On Add Product Error --> ",error)
    }

}



export const onGetAllProducts = async () => {

    const pro = await db.product.findMany(
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
    }
    )


    return pro

}