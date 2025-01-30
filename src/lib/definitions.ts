import { z } from "zod";
import { userSchema } from "./schemas";



export type User = z.infer<typeof userSchema>

export type Citation = {
    id: string | number;
    text: string;
    author: string;
    createdAt?: Date;
    }
export type ReqResponse = {
    success: boolean,
    message: string | undefined
  }

export type ReqError = {
    message: string | undefined
  }

  export type ReqSuccess = {
    message: string | undefined
  }
  export type Token = { id?: string | number; email?: string; name?: string }