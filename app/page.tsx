import { createClient } from '@/utils/supabase';
import DashboardGrid from './components/DashboardGrid';
import MobileDashboard from './components/MobileDashboard';

// WYMUSZAMY BRAK CACHE (Zawsze świeże dane)
export const revalidate = 0;

// === CZĘŚĆ LOGICZNA ===

interface SuccessPick {
  id: number;
  gospodarz: string;
  gosc: string;
  wynik: string;
  data: string;
}

function parseDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  const parts = dateStr.split('.').map(Number);
  if (parts.length !== 3) return new Date(0);
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

async function getSuccessPicks(): Promise<SuccessPick[]> {
  const supabase = createClient();
  
  // Pobieramy 10 najnowszych (po ID), żeby mieć pewność, że złapiemy ostatnio dodane
  // Nawet jak mają starą datę meczu, to chcemy je widzieć, jeśli właśnie je dodałeś?
  // Zazwyczaj sortuje się po dacie meczu. Sprawdźmy to:
  
  const { data, error } = await supabase
    .from('tips')
    .select('id, gospodarz, gosc, wynik, data')
    .ilike('kupon', 'Wygrany')
    // Usuń limit w zapytaniu, posortujemy w JS
    ;

  if (error) {
    console.error("Błąd pobierania danych:", error);
    return [];
  }
  
  if (!data) return [];

  // Sortowanie po dacie meczu (od najnowszych)
  const sortedPicks = data.sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime());
  
  // Bierzemy 3 pierwsze
  return sortedPicks.slice(0, 3);
}

// === KOMPONENT GŁÓWNY ===

export default async function HomePage() {
  const successPicks = await getSuccessPicks();

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-view-force { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-view-force { display: none !important; }
        }
      `}</style>

      {/* WERSJA DESKTOP */}
      <div className="desktop-view-force hidden md:block main-page-wrapper">
        <main className="container">
          <header style={{ marginBottom: '40px', width: '100%' }}>
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
              BET.AI <span style={{ color: 'var(--accent-magenta)' }}>PRO</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
              Zaawansowane algorytmy predykcyjne dla HT/FT.
            </p>
          </header>
          <DashboardGrid successPicks={successPicks} />
        </main>
      </div>

      {/* WERSJA MOBILE */}
      <div className="mobile-view-force md:hidden">
         <MobileDashboard />
      </div>
    </>
  );
}
