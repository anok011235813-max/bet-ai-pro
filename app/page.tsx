// Plik: app/page.tsx (ZASTĄP CAŁĄ ZAWARTOŚĆ)
import { createClient } from '@/utils/supabase';
import DashboardGrid from './components/DashboardGrid';

// Definicja typu, której wymaga Twój DashboardGrid
interface SuccessPick {
  id: number;
  gospodarz: string;
  gosc: string;
  wynik: string;
  data: string; // Potrzebujemy daty do sortowania
}

// Funkcja pomocnicza do poprawnego parsowania daty
function parseDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  const parts = dateStr.split('.').map(Number);
  if (parts.length !== 3) return new Date(0);
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

// Pobieramy dane i sortujemy je W KODZIE
async function getSuccessPicks(): Promise<SuccessPick[]> {
  const supabase = createClient();
  // Pobieramy dane BEZ sortowania po stronie bazy
  const { data, error } = await supabase
    .from('tips')
    .select('id, gospodarz, gosc, wynik, data') // Pobieramy 'data' do sortowania
    .ilike('kupon', 'Wygrany');

  if (error) {
    console.error("Błąd pobierania trafionych typów na stronie głównej:", error);
    return [];
  }
  
  if (!data) return [];

  // Sortujemy w kodzie (poprawnie) i bierzemy 3 najnowsze
  const sortedPicks = data.sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime());
  return sortedPicks.slice(0, 3);
}

export default async function HomePage() {
  const successPicks = await getSuccessPicks();

  return (
    <div className="main-page-wrapper">
      <main className="container">
        <header style={{ marginBottom: '40px', width: '100%' }}>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
            BET.AI <span style={{ color: 'var(--accent-magenta)' }}>PRO</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            Zaawansowane algorytmy predykcyjne dla HT/FT.
          </p>
        </header>
        {/* Przekazujemy POPRAWNIE posortowane dane */}
        <DashboardGrid successPicks={successPicks} />
      </main>
    </div>
  );
}
