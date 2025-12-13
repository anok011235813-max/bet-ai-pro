// Plik: app/layout.tsx

import { Outfit, Space_Grotesk } from 'next/font/google'; // Zmieniony import
import './globals.css';

// Konfiguracja czcionek
const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit', // Zmienna CSS
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-space-grotesk', // Zmienna CSS
});

export const metadata = {
  title: 'BET.AI PRO', // Możesz zmienić tytuł
  description: 'Zaawansowane algorytmy predykcyjne.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Używamy zmiennych w className
    <html lang="pl" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
