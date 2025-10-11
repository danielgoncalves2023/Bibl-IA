// src/app/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
// Corrigido: Uso de caminho relativo em vez de alias @/
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";
import { BookOpen, LogOut, User, Menu, X } from "lucide-react"; // Ícones lucide-react

// Cores da paleta: darkest-[#093321], primary-[#88E6D2], subtle-[#9BBAAD]

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Escuta o estado de autenticação para atualizar o usuário
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Fetch inicial do usuário
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navLinks = [
    { name: "Início", href: "/", icon: BookOpen },
    // Adicione mais links de navegação aqui conforme o projeto cresce, ex:
    // { name: 'Biblioteca', href: '/library', icon: Library },
    // { name: 'Devocionais', href: '/devotionals', icon: Heart }
  ];

  if (loading) return null; // Não renderiza a Navbar enquanto carrega

  return (
    <nav className="sticky top-0 z-50 bg-[#093321] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center text-xl font-bold text-[#88E6D2] hover:text-white transition-colors"
            >
              <BookOpen className="h-6 w-6 mr-2" aria-hidden="true" />
              Study.Bible
            </a>
          </div>

          {/* Links e Ações Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#9BBAAD] hover:bg-[#133B2A] hover:text-[#88E6D2] px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-[#9BBAAD] hover:text-red-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-red-400"
                title="Sair da Conta"
              >
                <LogOut className="h-5 w-5 mr-1" aria-hidden="true" />
                Sair
              </button>
            ) : (
              <a
                href="/login"
                className="flex items-center bg-[#88E6D2] text-[#133B2A] px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <User className="h-4 w-4 mr-1" aria-hidden="true" />
                Acessar
              </a>
            )}
          </div>

          {/* Botão Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-[#88E6D2] hover:text-white hover:bg-[#133B2A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#88E6D2]"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute w-full bg-[#093321] shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[#9BBAAD] hover:bg-[#133B2A] hover:text-[#88E6D2] block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left text-[#9BBAAD] hover:text-red-400 hover:bg-[#133B2A] px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" aria-hidden="true" />
              Sair da Conta
            </button>
          ) : (
            <a
              href="/login"
              className="flex items-center w-full text-left bg-[#88E6D2] text-[#133B2A] px-3 py-2 rounded-md text-base font-semibold hover:opacity-90 transition-opacity"
            >
              <User className="h-5 w-5 mr-2" aria-hidden="true" />
              Acessar
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
