import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const citations = await prisma.citation.findMany({
        select: {
            id: true,
            text: true,
            author: true
        },
    });
    return NextResponse.json({
        ok:true,
        message:"Hello, World!",
        data: citations
    });
}

export async function POST(request: NextRequest){
    const json = await request.json();
    await new Promise(r => {
        setTimeout(r, 1000);
    })
    const newCitation = await prisma.citation.create({
        data: {
            text: json.citation,
            author: json.author,
        }
    });
    return NextResponse.json({
        citation: newCitation,
    })
}