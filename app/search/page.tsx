// Plik: app/search/page.tsx (Wersja z kolorowym nagłówkiem)
import SearchForm from '../components/SearchForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="search-page-container">
      <Link href="/" className="back-link">
        <ArrowLeft size={18} color="#d946ef" /> Wróć
      </Link>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        {/* === ZMIANA KOLORU TUTAJ === */}
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-magenta)' }}>
          Wyszukiwarka HT/FT
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Przeszukaj historyczne łamaki dla każdej drużyny.<br /> Archiwum ponad 57 tysięcy łamaków od 2015 roku.</p>
      </header>
      
      <SearchForm />
    </div>
  );
}
