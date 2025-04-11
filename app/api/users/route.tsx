import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";


export function GET(request: NextRequest) {
    //fetch users from a db
    // request : Nextrequest est un paramètre qui permet d'éviter de mettre en cache le résultat. 
    return NextResponse.json([
        {   id: 1, 
            name: "Mosh" },
        {   id: 2,
            name: "John"
        }
    ])
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    // validate
    // if invalided : return a 400
    if (!validation.success) {
        return NextResponse.json (validation.error.errors, {status: 400})
    }
    return NextResponse.json({ id: 1, name: body.name }, {status: 201});
}