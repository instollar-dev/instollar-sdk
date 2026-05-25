export interface Language {
  name: string;
  nativeName: string;
  code: string;
  flagEmoji: string;
}

export const LANGUAGES: Language[] = [
  // West Africa
  { name: "Yoruba", nativeName: "Yorùbá", code: "yo", flagEmoji: "🇳🇬" },
  { name: "Igbo", nativeName: "Igbo", code: "ig", flagEmoji: "🇳🇬" },
  { name: "Hausa", nativeName: "Hausa", code: "ha", flagEmoji: "🇳🇬" },
  { name: "Fulani", nativeName: "Fulfulde", code: "ff", flagEmoji: "🇳🇬" },
  { name: "Wolof", nativeName: "Wolof", code: "wo", flagEmoji: "🇸🇳" },
  { name: "Twi", nativeName: "Twi", code: "tw", flagEmoji: "🇬🇭" },
  { name: "Ewe", nativeName: "Eʋegbe", code: "ee", flagEmoji: "🇬🇭" },
  { name: "Ga", nativeName: "Ga", code: "gaa", flagEmoji: "🇬🇭" },
  { name: "Dagbani", nativeName: "Dagbani", code: "dag", flagEmoji: "🇬🇭" },
  { name: "Bambara", nativeName: "Bamanankan", code: "bm", flagEmoji: "🇲🇱" },
  { name: "Dioula", nativeName: "Jula", code: "dyu", flagEmoji: "🇨🇮" },
  { name: "Fon", nativeName: "Fon", code: "fon", flagEmoji: "🇧🇯" },
  { name: "Krio", nativeName: "Krio", code: "kri", flagEmoji: "🇸🇱" },
  // East Africa
  { name: "Swahili", nativeName: "Kiswahili", code: "sw", flagEmoji: "🇰🇪" },
  { name: "Luganda", nativeName: "Luganda", code: "lg", flagEmoji: "🇺🇬" },
  { name: "Kinyarwanda", nativeName: "Kinyarwanda", code: "rw", flagEmoji: "🇷🇼" },
  { name: "Kirundi", nativeName: "Kirundi", code: "rn", flagEmoji: "🇧🇮" },
  { name: "Amharic", nativeName: "አማርኛ", code: "am", flagEmoji: "🇪🇹" },
  { name: "Tigrinya", nativeName: "ትግርኛ", code: "ti", flagEmoji: "🇪🇷" },
  { name: "Somali", nativeName: "Soomaali", code: "so", flagEmoji: "🇸🇴" },
  { name: "Oromo", nativeName: "Afaan Oromoo", code: "om", flagEmoji: "🇪🇹" },
  // Central Africa
  { name: "Lingala", nativeName: "Lingála", code: "ln", flagEmoji: "🇨🇩" },
  { name: "Kikongo", nativeName: "Kikongo", code: "kg", flagEmoji: "🇨🇩" },
  { name: "Tshiluba", nativeName: "Tshiluba", code: "lua", flagEmoji: "🇨🇩" },
  // Southern Africa
  { name: "Zulu", nativeName: "isiZulu", code: "zu", flagEmoji: "🇿🇦" },
  { name: "Xhosa", nativeName: "isiXhosa", code: "xh", flagEmoji: "🇿🇦" },
  { name: "Afrikaans", nativeName: "Afrikaans", code: "af", flagEmoji: "🇿🇦" },
  { name: "Sesotho", nativeName: "Sesotho", code: "st", flagEmoji: "🇱🇸" },
  { name: "Setswana", nativeName: "Setswana", code: "tn", flagEmoji: "🇧🇼" },
  { name: "Shona", nativeName: "ChiShona", code: "sn", flagEmoji: "🇿🇼" },
  { name: "Ndebele", nativeName: "isiNdebele", code: "nd", flagEmoji: "🇿🇼" },
  { name: "Chichewa", nativeName: "Chichewa", code: "ny", flagEmoji: "🇲🇼" },
  { name: "Malagasy", nativeName: "Malagasy", code: "mg", flagEmoji: "🇲🇬" },
  // North Africa
  { name: "Arabic", nativeName: "العربية", code: "ar", flagEmoji: "🇪🇬" },
  { name: "Tamazight", nativeName: "ⵜⴰⵎⴰⵣⵉⵖⵜ", code: "ber", flagEmoji: "🇲🇦" },
  // Major platform languages
  { name: "English", nativeName: "English", code: "en", flagEmoji: "🇬🇧" },
  { name: "French", nativeName: "Français", code: "fr", flagEmoji: "🇫🇷" },
  { name: "Portuguese", nativeName: "Português", code: "pt", flagEmoji: "🇵🇹" },
  { name: "Spanish", nativeName: "Español", code: "es", flagEmoji: "🇪🇸" },
];
