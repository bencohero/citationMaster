"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false, // ✅ Empêche la redirection automatique
    });

    if (response?.error) {
      setError("Email ou mot de passe incorrect.");
      setIsLoading(false);
    } else {
      router.push("/dashboard"); // ✅ Redirige vers `/dashboard`
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Bienvenue 👋
      </h2>

      {error && (
        <motion.p
          initial={{ x: 0 }}
          animate={{ x: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md mb-4"
          aria-live="assertive"
        >
          {error}
        </motion.p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <AiOutlineMail className="absolute left-3 top-3 text-gray-500 text-lg" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border pl-10 pr-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <AiOutlineLock className="absolute left-3 top-3 text-gray-500 text-lg" />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="border pl-10 pr-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`p-3 rounded-md text-white flex justify-center items-center transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-5 h-5 border-4 border-white border-t-transparent rounded-full"
            />
          ) : (
            "Se connecter"
          )}
        </button>
      </form>
    </motion.div>
  );
}
