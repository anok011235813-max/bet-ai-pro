// Plik: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... Twoje inne ustawienia (jeśli masz) ...

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // Zwiększamy limit do 20 MB
    },
  },
};

export default nextConfig;
