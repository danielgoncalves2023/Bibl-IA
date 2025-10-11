// src/app/login/page.tsx
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col items-center max-w-lg w-full">
        {/* Título Principal */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#133B2A]">
            Study.<span className="text-[#88E6D2]">Bible</span>
          </h1>
          <p className="mt-2 text-lg text-[#336651]">
            Seu portal para estudo e meditação bíblica.
          </p>
        </div>

        {/* Componente de Autenticação */}
        <AuthForm />

        {/* Informação Adicional de UX */}
        <p className="mt-8 text-center text-sm text-gray-500">
          <span className="font-semibold text-[#133B2A]">
            Segurança e Privacidade:
          </span>{" "}
          Usamos Supabase para garantir a segurança dos seus dados.
        </p>
      </div>
    </div>
  );
}
