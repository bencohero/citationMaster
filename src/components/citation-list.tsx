"use client";
import DeleteCitationButton from "@/app/admin/delete-citation-button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Citation } from "../lib/definitions";
import { buttonVariants } from "./ui/button";

export function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div>
      {citations.map((citation) => {
        return (
          <div className="p-4" key={citation.id}>
            <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
              <div className="flex flex-1 flex-col">
                <p className="relative pl-8 text-gray-800 text-xl font-semibold italic before:content-['«'] after:content-['»']">
                  {citation.text}&nbsp;
                </p>
                <p className="pl-12 text-gray-500 mt-2">-- {citation.author}</p>
              </div>
              <div className="flex gap-2 items-center justify-center w-full">
                <DeleteCitationButton id={citation.id as number} />
                <Link
                  href={`/admin/citations/${citation.id}`}
                  className={buttonVariants({
                    size: "sm",
                    variant: "outline",
                    class: "rounded bg-red-500 text-yellow-100",
                  })}
                >
                  <Pencil color="#2EFF22" />
                  &nbsp; Modifié
                </Link>
                <Link href={`/admin/citations/${citation.id}/share-citation`}>
                  share
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
