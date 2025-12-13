// Plik: app/active/page.tsx
import { createClient } from '@/utils/supabase';
import TipCard from '../components/TipCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

function parseDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  const parts = dateStr.split('.').map(Number);
  if (parts.length !== 3) return new Date(0);
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

function parseTime(timeStr: string): number[] {
    if (!timeStr) return [0, 0];
    return timeStr.split(':').map(Number);
}

async function getActivePicks() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('tips')
    .select('id, kraj, rozgrywki, data, godzina, gospodarz, gosc, wynik, status, teaminfocus, kupon, historia')
    .ilike('status', 'aktywny'); // Filtrujemy aktywne

  if (error) {
    console.error("Błąd pobierania aktywnych typów:", error);
    return [];
  }
  
  if (!data) return [];

  // Sortowanie chronologiczne (najbliższe mecze na górze)
  const sortedPicks = data.sort((a, b) => {
      const dateA = parseDate(a.data);
      const dateB = parseDate(b.data);
      
      if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
      }
      
      const [hourA, minA] = parseTime(a.godzina);
      const [hourB, minB] = parseTime(b.godzina);
      return (hourA * 60 + minA) - (hourB * 60 + minB);
  });

  return sortedPicks;
}

export default async function ActivePage() {
  const picks = await getActivePicks();

  return (
    <div className="history-page-container">
      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> Wróć do panelu
      </Link>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        {/* Kolor zielony dla Aktywnych */}
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#d946ef' }}>
          Nasze wybrane Typy
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Propozycje łamaków na najbliższe dni.</p>
      </header>

      <div className="tip-card-list">
        {picks.length > 0 ? (
          // === TO JEST KLUCZ DO SUKCESU ===
          // Przekazujemy cały obiekt 'pick' jako prop 'tip', tak jak w Historii
          picks.map(pick => <TipCard key={pick.id} tip={pick} />)
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Brak aktywnych typów w tym momencie.</p>
        )}
      </div>
    </div>
  );
}
