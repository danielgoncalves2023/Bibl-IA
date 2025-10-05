// Utilitários para manipulação de classes CSS (especialmente útil com Tailwind)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Função para formatar datas
export function formatDate(date: Date | string, locale: string = 'pt-BR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale);
}

// Função para debounce
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Função para capitalizar primeira letra
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função para truncar texto
export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}