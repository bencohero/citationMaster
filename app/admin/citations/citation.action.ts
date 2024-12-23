'use server'
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function getCitationAction(id: number){
    try {       
        return await prisma.citation.findUnique({ where: { id } });
    } catch {
       alert("alert")
    }
}

export async function createCitationAction(citation: {
    text: string,
    author: string
}) {
    try {
        await prisma.citation.create({
            data: {
                text: citation.text,
                author: citation.author,
            }
        });
    } catch {
        return {
            error: "Error occured while creating the citation !!"
        }
    }

    redirect('/admin');
}


export async function deleteCitationAction(id: number) {
    await prisma.citation.delete({
        where: {
            id: id
        }
    });

    return {
        message: "Deleted !!!"
    }
}

export async function updateCitationAction(id: number, citation: {
    text: string,
    author: string
}) {
    try {
        await prisma.citation.update({
            where: {
                id: id
            },
            data: {
                text: citation.text,
                author: citation.author
            }
        })
    } catch {
        return {
            error: "Error occured while updating the citation !!"
        }
    }

    redirect('/admin');
}