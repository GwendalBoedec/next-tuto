import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";


export async function GET(request: NextRequest) {
    //fetch users from a db
    // request : Nextrequest est un paramètre qui permet d'éviter de mettre en cache le résultat. 
    const users = await prisma.user.findMany()
    /*on aurait pu ajouter dans findMany des conditions pour filtrer{
        where: {
            email: ""
        }
    })*/
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    // validate
    // if invalided : return a 400
    if (!validation.success) {
        return NextResponse.json (validation.error.errors, {status: 400})
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (user)
        return NextResponse.json({ error: "User already exists" }, { status : 400 })


    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    return NextResponse.json(newUser, {status: 201});
}