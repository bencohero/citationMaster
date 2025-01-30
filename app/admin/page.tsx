import { CitationList } from "@/src/components/citation-list";
import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Citation } from "@/src/lib/definitions";
import { Link } from "lucide-react";
import { getCitationsAction } from "./citations/citation.action";

export default async function Page() {
  /* const session = await getSession();

  if (!session) {
    return <Error />;
  } */

  const result = await getCitationsAction();
  if ("error" in result) {
    return <div>Error: {result.error}</div>;
  }
  const citations: Citation[] = result;

  return (
    <div>
      <Card className="w-full">
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
          <CitationList citations={citations} />
        </CardContent>
      </Card>
    </div>
  );
}
