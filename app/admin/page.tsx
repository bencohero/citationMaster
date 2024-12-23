import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import DeleteCitationButton from "./delete-citation-button";
import { Pencil } from "lucide-react";

export default async function page() {
  //await new Promise((r) => setTimeout(r, 1000));

  const citations = await prisma.citation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Citations</CardTitle>
        <div>{citations.length}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ size: "lg", variant: "outline" })}
          href="/admin/citations/new"
        >
          new citation
        </Link>
        {citations.map((citation) => {
          return (
            <Card className="p-4" key={citation.id}>
              <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
                <div className="flex flex-1 flex-col">
                  <p className="relative pl-8 text-gray-800 text-xl font-semibold italic before:content-['«'] after:content-['»']">
                    {citation.text}&nbsp;
                  </p>
                  <p className="pl-12 text-gray-500 mt-2">-- {citation.author}</p>
                </div> 
                 <div className="flex gap-2 items-center justify-center w-full">             
                  <DeleteCitationButton id={citation.id}/>
                  <Link
                  href={`/admin/citations/${citation.id}`}
                  className={buttonVariants({ size: "sm", variant: "outline", class: "rounded bg-red-500 text-yellow-100" })}
                  >
                    <Pencil color="#2EFF22"/>&nbsp; Modifié
                  </Link>
                  <Link 
                    href={`/admin/citations/${citation.id}/share-citation`}
                  >
                    share
                  </Link>
                  </div>
                </div>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
