/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_ANALYTICS_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  
  // Vite glob import support
  glob<T = unknown>(pattern: string, options?: { as?: string; eager?: boolean }): Record<string, T>;
}

// Extend ImportMeta for glob patterns
declare module '*?raw' {
  const content: string;
  export default content;
}
