import { LANGUAGES } from './data';

export { LANGUAGES };
export type { Language } from './data';

export const searchLanguages = (query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return LANGUAGES;
  return LANGUAGES.filter(
    l =>
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
  );
};

export const getLanguageByCode = (code: string) =>
  LANGUAGES.find(l => l.code === code) ?? null;
