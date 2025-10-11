Study.Bible: Seu Companheiro de Estudo Bíblico e Teológico

📖 Visão Geral do Projeto
O Study.Bible é mais do que uma plataforma de leitura; é um ecossistema digital projetado para aprofundar a meditação, o estudo e a compreensão da Bíblia Sagrada e da teologia cristã.

Nosso objetivo é fornecer ao usuário todo o suporte contextual e acadêmico necessário para sua jornada de fé, culminando na futura integração de um Assistente de Inteligência Artificial especializado.

Missão
Fornecer uma ferramenta acessível e inteligente que ilumine o texto bíblico, oferecendo contexto, respondendo a dúvidas teológicas complexas e auxiliando na produção de conteúdo devocional e de pregação.

🚀 Pilha Tecnológica (Tech Stack)
Este projeto é construído com ferramentas modernas e escaláveis para garantir performance, responsividade e facilidade de manutenção.

Categoria

Tecnologia

Propósito

Framework

Next.js

Framework React para renderização do lado do servidor (SSR) e estática, garantindo SEO e alta performance.

Styling

Tailwind CSS

Framework de CSS utilitário para design rápido, responsivo e esteticamente agradável.

Build Tool

Vite

Para ambiente de desenvolvimento rápido e otimização de build.

Autenticação & DB

Supabase

Backend como serviço (BaaS) usado primariamente para autenticação de usuários (e-mail/senha) e futura gestão de dados de notas/devocionais.

Linguagem

TypeScript

Garante código mais robusto e menos propenso a erros.

✨ Módulo Futuro: Assistente de Inteligência Artificial
A característica mais inovadora do Study.Bible será seu Assistente de IA, treinado em uma vasta coleção de obras teológicas e livros cristãos fornecidos pela comunidade.

Intenção e Funcionalidades
O módulo de IA será implementado através de uma arquitetura Retrieval-Augmented Generation (RAG), utilizando um modelo de linguagem (LLM) de código aberto ou API especializada.

Contextualização de Versículos: O usuário poderá destacar qualquer versículo e solicitar uma explicação profunda, incluindo contexto histórico, cultural e hermenêutico, baseado na nossa biblioteca teológica.

Resolução de Dúvidas: Capacidade de responder a perguntas complexas sobre doutrina, história da igreja e passagens difíceis.

Geração de Conteúdo: O usuário poderá pedir ao IA para gerar:

Esboços de Pregação: Estruturas detalhadas para sermões sobre um tema ou texto específico.

Devocionais Pessoais: Textos curtos e reflexivos baseados na leitura diária do usuário.

Estrutura de Integração (Roadmap)
A integração do IA será realizada em três fases principais:

Estrutura de Dados: Limpeza, segmentação e vetorização (embeddings) da coleção de PDFs e Word para armazenamento em um Banco de Dados Vetorial.

Servidor de Inferência: Configuração de um servidor dedicado (GCP/AWS) para rodar o Modelo de Linguagem (LLM) e o framework de orquestração (ex: LangChain).

Interface Conversacional: Desenvolvimento do componente React/Next.js para o chat e exibição das respostas formatadas na dashboard (área de aside).

⚙️ Configuração Inicial do Projeto
Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

Pré-requisitos
Node.js (versão LTS)

npm ou yarn

Conta Supabase (para obter as chaves de ambiente)

Instalação
# Clone o repositório
git clone [https://aws.amazon.com/pt/what-is/repo/](https://aws.amazon.com/pt/what-is/repo/)
cd study-bible-project

# Instale as dependências
npm install
# ou
yarn install

Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto e preencha com suas chaves do Supabase:

# .env.local
NEXT_PUBLIC_SUPABASE_URL="[SUA URL DO PROJETO SUPABASE]"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[SUA CHAVE ANON PÚBLICA]"

Rodando o Servidor
# Inicia o servidor de desenvolvimento
npm run dev
# ou
yarn dev

O projeto estará acessível em http://localhost:3000.