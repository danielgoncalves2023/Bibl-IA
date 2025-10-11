// src/app/components/AuthForm.tsx
"use client";

import { useState, FormEvent } from "react";
// Corrigido: Uso de caminho relativo em vez de alias @/
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Ícone de carregamento

// Cores da paleta: dark-[#133B2A], primary-[#88E6D2]

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const router = useRouter();

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    let error: any = null;

    if (isLogin) {
      // Tenta fazer login
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = loginError;
      if (!error) {
        setMessage({
          type: "success",
          text: "Login realizado com sucesso! Redirecionando...",
        });
        router.push("/");
        return;
      }
    } else {
      // Tenta registrar
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });
      error = signupError;
      if (!error && data.user) {
        setMessage({
          type: "success",
          text: "Verifique seu email para confirmar o registro.",
        });
      }
    }

    setLoading(false);
    if (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: error.message || "Ocorreu um erro na autenticação.",
      });
    }
  };

  const title = isLogin ? "Acessar Conta" : "Criar Nova Conta";
  const buttonText = isLogin ? "Entrar" : "Registrar";

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-bold text-center text-[#133B2A]">{title}</h2>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm transition-opacity duration-300 ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-green-100 text-green-700 border border-green-200"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#133B2A] focus:border-[#133B2A] transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#133B2A] focus:border-[#133B2A] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || password.length < 6 || email.length === 0}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-[#133B2A] transition-all duration-200
            ${
              loading
                ? "bg-[#9BBAAD]/80"
                : "bg-[#88E6D2] hover:bg-[#88E6D2]/80 transform hover:scale-[1.01]"
            }
            disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        {isLogin ? "Novo por aqui?" : "Já tem uma conta?"}{" "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage(null);
          }}
          className="font-semibold text-[#133B2A] hover:text-[#336651] transition-colors"
        >
          {isLogin ? "Criar Conta" : "Acessar"}
        </button>
      </p>
    </div>
  );
}
