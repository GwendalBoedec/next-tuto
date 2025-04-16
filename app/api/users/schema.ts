import { z } from "zod";

const schema = z.object({
    name: z.string().min(3), //permet d'ajouter des checks sur la value name
    email: z.string().email(),
    //age: z.number()
});

export default schema;

