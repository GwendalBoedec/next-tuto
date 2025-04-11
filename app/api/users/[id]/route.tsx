import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET (
    request: NextRequest, 
    { params }: { params: { id: number } }) {
        // Fetch data from a db
        // if not found, return 404 error
        // else return data
        if (params.id > 10) {
            return NextResponse.json({error: "User not found" }, { status: 404 })
        }
        // ici le else est facultatif, il vaut mieux directement mettre le return
        else {
        console.log("id is less than 10");
        return NextResponse.json({id: 1, name: "Mosh"});
        }
}

export async function PUT(
    request: NextRequest, 
    { params }: { params: { id: number } }
) {
    const body = await request.json()
// validate request body
const validation = schema.safeParse(body);
if (!validation.success) {
   return NextResponse.json(validation.error.issues, { status: 400 })
}
else if (params.id > 10) {
    return NextResponse.json({error: "invalid id"}, { status: 404 })
}
return NextResponse.json( { id: 1, name: body.name })
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: number } }
) {
    const body = await request.json()
// validate existing id
if (params.id > 10) {
    return NextResponse.json({error: "invalid id"}, { status: 404 })
}
return NextResponse.json( {message: `user ${params.id} deleted` }, { status: 200})
}