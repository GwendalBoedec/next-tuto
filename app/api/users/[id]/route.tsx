import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

export async function GET (
    request: NextRequest, 
    { params }: { params: { id: string } }) {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id)}
        })
        // Fetch data from a db
        // if not found, return 404 error
        // else return data
        if (!user) {
            return NextResponse.json({error: "User not found" }, { status: 404 })
        }
        // ici le else est facultatif, il vaut mieux directement mettre le return
        else {
        return NextResponse.json(user);
        }
}

export async function PUT(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    const body = await request.json()
// validate request body
const validation = schema.safeParse(body);
if (!validation.success) {
   return NextResponse.json(validation.error.issues, { status: 400 })
}
const user = await prisma.user.findUnique({
    where: {
        id: parseInt(params.id)
    }
})
if (!user) {
    return NextResponse.json({error: "user does not exist"}, { status: 404 })
}

const updatedUser = await prisma.user.update({
    where: 
    { id: user.id },

    data: 
    {
       name: body.name,
       email: body.email 
    }
})
return NextResponse.json(updatedUser)
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
   
// validate existing id
const user = await prisma.user.findUnique({
    where: {
        id: parseInt(params.id)
    }
})
if (!user) {
    return NextResponse.json({error: "user not found"}, { status: 404 })
}

prisma.user.delete({
    where: {
        id: user.id
    }
})
return NextResponse.json( {message: `user ${params.id} deleted` }, { status: 200})
}