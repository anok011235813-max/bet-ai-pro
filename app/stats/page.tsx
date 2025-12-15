// Plik: app/statistics/page.tsx
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Percent, Calendar, Trophy, Target } from 'lucide-react';

export default function StatisticsPage() {
  const stats = [
    {
      label: 'Nasza skuteczność',
      value: '12,58%',
      // ZMIANA: Kolor czerwony #ef4444
      icon: <Percent size={24} color="#ef4444" />, 
      desc: 'Procent trafionych kuponów',
      color: '#ef4444'
    },
    {
      label: 'Yield',
      value: '243,38%',
      icon: <TrendingUp size={24} color="#4ade80" />, // accent-green
      desc: 'Zwrot z inwestycji',
      color: 'var(--accent-green)'
    },
    {
      label: 'Trafione',
      value: '18',
      icon: <Target size={24} color="#60a5fa" />, // blue
      desc: 'Wygrane kupony',
      color: '#60a5fa'
    },
    {
      label: 'Wytypowane',
      value: '143',
      icon: <Calendar size={24} color="#fb923c" />, // orange
      desc: 'Wszystkie podane typy',
      color: '#fb923c'
    },
    {
      label: 'Średni trafiony kurs',
      value: '31', 
      icon: <Target size={24} color="#ec4899" />, // pink
      desc: 'Średnia wartość kursów',
      color: '#ec4899'
    },
    {
      label: 'Najwyższy trafiony kurs',
      value: '60',
      icon: <Trophy size={24} color="#facc15" />, // yellow
      desc: 'Rekordowa wygrana',
      color: '#facc15'
    }
  ];

  return (
    <div className="history-page-container"> {/* Używamy Twojej klasy kontenera */}
      
      <Link href="/" className="back-link" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none' }}>
        <ArrowLeft size={18} color="#d946ef" /> Wróć
      </Link>

      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
          Statystyki <span style={{ color: 'var(--accent-magenta)' }}>Listopad</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Zobacz naszą skuteczność i kluczowe wskaźniki.
        </p>
      </header>

      {/* Grid w czystym CSS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        
        {stats.map((stat, index) => (
          <div 
            key={index}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${stat.color}`, // Kolor ramki zależny od statystyki
              borderRadius: '24px', // Zaokrąglenie jak w bento grid
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 20px ${stat.color}1a` // Delikatna poświata (hex + opacity)
            }}
          >
            {/* Nagłówek karty */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                {stat.label}
              </span>
              <div style={{ 
                padding: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '8px', 
                display: 'flex' 
              }}>
                {stat.icon}
              </div>
            </div>

            {/* Wartość */}
            <div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: stat.color,
                fontFamily: 'var(--font-heading)',
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                {stat.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        * Statystyki są aktualizowane na koniec każdego miesiąca.
      </div>
    </div>
  );
}
