/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_IS_DEV: string;
  VITE_API_URL: string;
  VITE_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
