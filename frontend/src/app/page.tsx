// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
// Corrigido: Uso de caminho relativo em vez de alias @/
import { supabase } from "./utils/supabaseClient";
import { useRouter } from "next/navigation";
import { BookOpenText, Zap, Loader2 } from "lucide-react"; // Ícones

// Cores da paleta: dark-[#133B2A], primary-[#88E6D2], dark-green-[#336651]

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Redireciona para o login se não estiver autenticado
        router.push("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    // Mantém o estado atualizado
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/login");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-[#133B2A] animate-spin" />
      </div>
    );
  }

  // O componente Navbar é esperado para ser incluído no layout.tsx
  const userEmail = user?.email || "Usuário";
  const displayName = userEmail.split("@")[0]; // Usa a parte antes do @ como nome

  return (
    <main className="min-h-[calc(100vh-64px)] p-4 md:p-8 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#133B2A]">
          Bem-vindo(a), {displayName}!
        </h1>
        <p className="text-lg text-[#336651] mt-1">
          Continue sua jornada de estudo e meditação.
        </p>
      </header>

      {/* Layout Principal: 2 Colunas para Desktop, 1 Coluna para Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal do Conteúdo Bíblico (2/3 da largura no desktop) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-[#88E6D2]">
            <div className="flex items-center text-[#133B2A] mb-4">
              <BookOpenText className="h-6 w-6 mr-3" />
              <h2 className="text-xl font-semibold">Leitura do Dia</h2>
            </div>
            <p className="text-gray-600">
              {/* Espaço para o componente de exibição do texto bíblico. */}
              Aqui será exibido o texto bíblico atual. Use fontes limpas e
              espaçamento adequado para facilitar a leitura.
            </p>
            <div className="mt-4 p-4 bg-[#9BBAAD]/20 rounded-lg">
              <p className="text-[#336651] font-medium">João 3:16</p>
              <p className="text-[#133B2A] italic">
                &quot;Porque Deus amou o mundo de tal maneira que deu o seu
                Filho unigênito, para que todo aquele que nele crê não pereça,
                mas tenha a vida eterna.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Coluna da IA / Ferramentas (1/3 da largura no desktop) */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-[#133B2A] p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-[#88E6D2]">
            <div className="flex items-center text-[#88E6D2] mb-4">
              <Zap className="h-6 w-6 mr-3" />
              <h2 className="text-xl font-semibold">
                Assistente de IA (Próxima Fase)
              </h2>
            </div>
            <p className="text-gray-200 mb-4">
              Esta área será dedicada ao seu assistente de IA para teologia.
            </p>
            <div className="space-y-3">
              <button className="w-full text-left flex items-center p-3 rounded-lg bg-[#336651] text-white hover:bg-[#336651]/80 transition-colors">
                <BookOpenText className="h-5 w-5 mr-2" />
                Pergunte sobre um versículo
              </button>
              <button className="w-full text-left flex items-center p-3 rounded-lg bg-[#336651] text-white hover:bg-[#336651]/80 transition-colors">
                <Zap className="h-5 w-5 mr-2" />
                Gerar Esboço de Pregação
              </button>
            </div>
          </div>

          {/* Outros Cards de Ferramentas */}
          <div className="bg-white p-6 rounded-xl shadow border-t-2 border-gray-200">
            <h3 className="text-lg font-semibold text-[#133B2A]">
              Notas Rápidas
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Um espaço para anotações e insights.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
