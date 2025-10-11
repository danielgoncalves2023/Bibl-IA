// src/app/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Certifique-se de que estas variáveis de ambiente estão configuradas no .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('As variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY devem ser definidas.');
}

// Cria e exporta o cliente Supabase para o lado do cliente (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Nota de Implementação:
 * No Next.js 13/14 App Router, é comum criar um cliente separado para Server Components
 * (usando cookies) e um para Client Components. Para manter a simplicidade neste exemplo,
 * estamos usando um cliente simples voltado para o cliente (browser).
 */
