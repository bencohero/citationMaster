"use client";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { deleteCitationAction } from "./citations/citation.action";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

const DeleteCitationButton = (props: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onDelete = async () => {
    setIsLoading(true);
    await deleteCitationAction(props.id);
    setIsLoading(false);
    router.refresh();
  };
  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        onDelete();
      }}
      className="bg-gray-800 h-[30px] text-yellow-50 hover:bg-gray-500"
    >
      {isLoading ? (
        <Loader2 className="animate-spin border-orange-600"></Loader2>
      ) : (
        <Trash2 />
      )}
    </Button>
  );
};

export default DeleteCitationButton;
