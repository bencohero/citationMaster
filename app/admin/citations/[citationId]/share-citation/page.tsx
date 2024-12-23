import ShareButton from "@/src/components/share-button";
import { Card } from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import React from "react";

async function Page(
  props: Readonly<{
    params: Promise<{
      citationId: string;
    }>;
  }>
) {
  const params = await props.params;
  const citation = await prisma.citation.findFirst({
    where: {
      id: Number(params.citationId),
    },
  });

  return (
    <Card className="p-4" key={citation?.id}>
      <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2 p-4 bg-white rounded shadow-md">
        <div className="flex flex-1 flex-col">
          <p className="relative pl-8 text-xl font-semibold italic before:content-['«'] after:content-['»']">
            {citation?.text}&nbsp;
          </p>
          <p className="text-gray-500 mt-2">-- {citation?.author}</p>
        </div>
        <div className="f justify-center w-full">
            <ShareButton citation={{text:citation!.text, author: citation!.author }}/>
        </div>
      </div>
    </Card>
  );
}

export default Page;
