import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productService } from "../services/product.service"

export const useCreateProduct =()=> {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productService.createProduct,
       onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['products']})
       }
    })

}