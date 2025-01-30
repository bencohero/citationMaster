"use client";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

export const Error = ({
  message = "Something went wrong",
}: {
  message?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{message}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Error;
