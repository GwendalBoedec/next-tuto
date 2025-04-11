import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(2), //permet d'ajouter des checks sur la value name
    price: z.number().min(1).max(100)
});

export default productSchema;