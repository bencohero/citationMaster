import { CitationForm } from "@/src/components/citation-form";
import { prisma } from "@/src/lib/prisma";

export default async function Page(
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
    select: {
      text: true,
      author: true,
    },
  });

  if (!citation) {
    return <div>Not found</div>;
  }else{
      return <CitationForm citation={citation} id={Number(params.citationId)} />;
  }
}
