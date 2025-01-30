"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";

export function GitHubLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(""); // Réinitialisation de l'erreur

    const response = await signIn("github", { redirect: false });

    if (response?.error) {
      setError("Échec de l'authentification. Réessayez.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <motion.button
        onClick={handleGitHubLogin}
        disabled={isLoading}
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`mt-4 p-3 w-full flex items-center justify-center gap-2 rounded-md transition-all ${
          isLoading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800 text-white"
        }`}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-5 h-5 border-4 border-white border-t-transparent rounded-full"
          />
        ) : (
          <>
            <AiFillGithub className="text-xl" />
            Se connecter avec GitHub
          </>
        )}
      </motion.button>

      {/* ✅ Message d'erreur avec effet de secousse */}
      {error && (
        <motion.p
          initial={{ x: 0 }}
          animate={{ x: [-10, 10, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md mt-2 w-full"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
