import { NextRequest, NextResponse } from "next/server";
import productSchema from "../schema";

export function GET(request: NextRequest, { params }: { params: {id: number }}) {
    if (params.id > 10) {
        return NextResponse.json({error: "product not found" }, { status: 404 })
    }
    // ici le else est facultatif, il vaut mieux directement mettre le return
    else {
    console.log("id is less than 10");
    return NextResponse.json({id: 1, name: "egg", price: 2});
    }
}

