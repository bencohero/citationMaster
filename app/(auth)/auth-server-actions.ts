"use server";

import { signIn } from "next-auth/react";

export async function login(prevState: {success: boolean, error: string | null}, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log(email, password);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // ✅ Délai de 1.5s pour un effet plus naturel

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      return { success: false, error: response.error,};
    }

    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Une erreur est survenue. Réessayez plus tard." };
  }
}
