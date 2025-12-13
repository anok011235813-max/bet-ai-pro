// Plik: app/vip/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search, Swords, Clock, Crown, ArrowRight, LogOut, Loader2 } from 'lucide-react';

export default function VipDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkVipAccess = async () => {
      // 1. Sprawdź sesję (czy zalogowany)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/'); 
        return;
      }

      // 2. Sprawdź rolę w tabeli 'users'
      // Pobieramy rolę dla zalogowanego ID
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || !userData) {
        console.error("Błąd pobierania roli:", error);
        alert("Błąd weryfikacji uprawnień.");
        router.push('/');
        return;
      }

      // 3. Logika dostępu: Wpuszczamy 'vip' oraz 'admin'
      if (userData.role === 'vip' || userData.role === 'admin') {
        setIsAuthorized(true);
        setLoading(false);
      } else {
        // Jeśli zwykły user ('user') -> przekieruj do cennika lub na stronę główną
        alert("To strefa tylko dla VIP-ów! Wykup dostęp.");
        router.push('/price'); 
      }
    };

    checkVipAccess();
  }, [router, supabase]);

  const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/');
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px' }}>
        <Loader2 className="animate-spin" size={40} color="#FFD700" />
        <p style={{ color: '#888' }}>Weryfikacja uprawnień VIP...</p>
      </div>
    );
  }

  // Jeśli załadowano, ale brak autoryzacji (teoretycznie router.push zadziała wcześniej, ale dla bezpieczeństwa renderowania):
  if (!isAuthorized) return null;

  return (
    <div className="main-page-wrapper">
      <main className="container">
        
        {/* HEADER VIP */}
        <header style={{ marginBottom: '40px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '2.5rem', fontWeight: 700, color: '#FFD700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Crown /> STREFA VIP
            </h1>
            <p style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
              Witaj w centrum dowodzenia. Dostęp odblokowany.
            </p>
          </div>
          <button onClick={handleLogout} className="button-outline" style={{borderColor: '#333', color: '#888'}}>
             <LogOut size={16} /> Wyloguj
          </button>
        </header>

        {/* BENTO GRID VIP (2x2 UKŁAD) */}
        <div className="vip-grid">
            
            {/* 1. WYSZUKIWARKA NA DZIEŃ (DUŻY) */}
            <Link href="/vip/daily-search" className="card card-wide">
                <div className="card-header"><div className="icon-wrap"><Search /></div></div>
                <div>
                    <h3>Skaner Dnia</h3>
                    <p>Wyszukiwarka typów na konkretny dzień meczowy.</p>
                </div>
                <div className="card-footer"><div className="arrow-btn"><ArrowRight size={20} /></div></div>
            </Link>

            {/* 2. NAJLEPSZE PARY H2H (MAŁY) */}
            <Link href="/h2h" className="card card-square">
                <div className="card-header"><div className="icon-wrap"><Swords /></div></div>
                <div>
                    <h3>Top H2H</h3>
                    <p>Pary z historią.</p>
                </div>
            </Link>

            {/* 3. SCHEMATY CZASOWE (MAŁY) */}
            <Link href="/vip/patterns" className="card card-square">
                <div className="card-header"><div className="icon-wrap"><Clock /></div></div>
                <div>
                    <h3>Schematy HT/FT</h3>
                    <p>Analiza czasowa.</p>
                </div>
            </Link>

            {/* 4. TYPY PREMIUM (DUŻY) */}
            <Link href="/vip/premium-picks" className="card card-wide vip-glow">
                <div className="card-header"><div className="icon-wrap" style={{ color: '#FFD700', borderColor: '#FFD700' }}><Crown /></div></div>
                <div>
                    <h3>Typy Premium</h3>
                    <p>Wyselekcjonowane propozycje o najwyższym prawdopodobieństwie.</p>
                </div>
                <div className="card-footer"><div className="arrow-btn"><ArrowRight size={20} /></div></div>
            </Link>

        </div>

        <div style={{ marginTop: '40px' }}>
            <Link href="/" className="back-link">
                <ArrowLeft size={16} /> Wróć do strony głównej
            </Link>
        </div>

      </main>

      <style jsx>{`
        .vip-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            width: 100%;
        }

        @media (min-width: 1024px) {
            .vip-grid {
                grid-template-areas: 
                    "big1 small1"
                    "small2 big2";
                grid-template-columns: 1.5fr 1fr;
                grid-auto-rows: 280px;
            }
            .card:nth-child(1) { grid-area: big1; }
            .card:nth-child(2) { grid-area: small1; }
            .card:nth-child(3) { grid-area: small2; }
            .card:nth-child(4) { grid-area: big2; }
        }

        .vip-glow {
            border-color: rgba(255, 215, 0, 0.3);
            background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(0,0,0,0.4));
        }
        .vip-glow:hover {
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
            border-color: rgba(255, 215, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
