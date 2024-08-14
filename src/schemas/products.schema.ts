import { z } from "zod"

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];



const fileSchema = z
  .array(z.instanceof(File, { message: "Required" }))
  .min(1, { message: "Required" })
  .refine(files => ACCEPTED_FILE_TYPES.includes(files[0]?.type), {
    message: "Invalid file type",
  });

export type ProductSchemaProps = {
    name: string
    priceInCents: number
    description: string
    filePath: any
    imagePath: any
   
}


export const ProductSchema = z.object({
    name: z.string().min(1,{message: "Name must not be empty"}),
    priceInCents: z.coerce.number().int().min(1,{message: "Name must not be empty"}).refine((value) => value > 0,{message:"Price must be greater than 0"}),
    description: z.string().min(1,{message:"Descriotiuon must not be empty"}),
    filePath: z.any().refine((file) => ACCEPTED_FILE_TYPES.includes(file[0]?.type)),
    imagePath: z.any().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type))
})