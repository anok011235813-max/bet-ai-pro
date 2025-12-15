// Plik: app/history/page.tsx (Wersja z kolorowym nagłówkiem)
import { createClient } from '@/utils/supabase';
import TipCard from '../components/TipCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Funkcja pomocnicza do parsowania daty
function parseDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  const parts = dateStr.split('.').map(Number);
  if (parts.length !== 3) return new Date(0);
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

// Pobieramy dane i sortujemy je po stronie serwera
async function getSuccessPicks() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tips')
    .select('id, kraj, rozgrywki, data, godzina, gospodarz, gosc, wynik, status, teaminfocus, kupon, historia') 
    .ilike('kupon', 'Wygrany');

  if (error) {
    console.error("Błąd pobierania trafionych typów:", error);
    return [];
  }
  
  if (!data) return [];

  // Poprawne sortowanie w kodzie
  const sortedPicks = data.sort((a, b) => parseDate(b.data).getTime() - parseDate(a.data).getTime());
  return sortedPicks;
}

export default async function HistoryPage() {
  const picks = await getSuccessPicks();

  return (
    <div className="history-page-container">
      <Link href="/" className="back-link">
        <ArrowLeft size={18} color="#d946ef" /> Wróć
      </Link>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        {/* === ZMIANA KOLORU TUTAJ === */}
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-magenta)' }}>
          Trafione Typy
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Sprawdź wszystkie nasze trafione Typy.</p>
      </header>

      <div className="tip-card-list">
        {picks.length > 0 ? (
          picks.map(pick => <TipCard key={pick.id} tip={pick} />)
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Brak trafionych typów w archiwum.</p>
        )}
      </div>
    </div>
  );
}
