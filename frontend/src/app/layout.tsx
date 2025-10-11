// src/app/layout.tsx
import "./styles/globals.css"; // Importa o CSS global
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Inclui a barra de navegação no layout principal */}
        <Navbar />

        {/* Renderiza o conteúdo da página */}
        {children}
      </body>
    </html>
  );
}
