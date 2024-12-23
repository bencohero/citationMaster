"use client";
import {
  createCitationAction,
  updateCitationAction,
} from "@/app/admin/citations/citation.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  citation?: {
    text: string;
    author: string;
  };
  id?: number;
};
export const CitationForm = (props: Props) => {
  const createCitation = async (formData: FormData) => {
    let json: { error: string };
    if (props.citation) {
        json = await updateCitationAction(props.id!, {
            text: String(formData.get("citation")),
            author: String(formData.get("author")),
        });
        toast("Citation upadted successfully !!!");

    } else {
      json = await createCitationAction({
        text: String(formData.get("citation")),
        author: String(formData.get("author")),
      });
      toast("Citation created successfully !!!");
    }
    if (!json.error) {
      toast("Error, occured while creating the citation !");
    }
    toast("Citation created successfully !!!", {
        description: "*******************"
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create citation</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            await createCitation(formData);
          }}
          className="flex flex-col gap-2"
        >
          <Label htmlFor="">
            Citation
            <Input defaultValue={props.citation?.text} name="citation" />
          </Label>

          <Label htmlFor="">
            Author
            <Input defaultValue={props.citation?.author} name="author" />
          </Label>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="bg-green-300 rounded hover:bg-green-900 hover:text-yellow-100"
    >
      {pending ?
        (
        <Loader2 className="animate-spin"/>
        ) : "Submit"}
    </Button>
  );
};
