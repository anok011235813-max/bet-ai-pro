'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import TipCard from './TipCard';
import LoginPrompt from './LoginPrompt';
import SearchSection from './SearchSection';

interface Tip {
  id: number;
  league: string;
  home_team: string;
  away_team: string;
  match_datetime: string;
  is_public: boolean;
  status: string;
  data: string; // format dd.mm.yyyy
  godzina: string; // format hh:mm
}

interface HomePageContentProps {
  initialTips: Tip[];
  user: User | null;
}

export default function HomePageContent({ initialTips, user }: HomePageContentProps) {
  const [activeFilter, setActiveFilter] = useState('historyczny');
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const needsLogin = !user && (activeFilter === 'aktywny' || activeFilter === 'wyszukiwarka');

  // Parsowanie daty i godziny
  const parseDateTime = (dateStr: string, timeStr: string) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const filteredTips = initialTips
    .filter(tip => {
      if (activeFilter === 'historyczny') return tip.status.toLowerCase().startsWith('hist');
      if (activeFilter === 'aktywny') return tip.status.toLowerCase().startsWith('akt');
      return false;
    })
    .sort((a, b) => {
      const timeA = parseDateTime(a.data, a.godzina).getTime();
      const timeB = parseDateTime(b.data, b.godzina).getTime();

      // historyczne: od najnowszych do najstarszych
      if (activeFilter === 'historyczny') {
        return timeB - timeA;
      }
      // aktywne: od najstarszych do najnowszych
      else if (activeFilter === 'aktywny') {
        return timeA - timeB;
      }
      return 0;
    });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <header className="site-header">
        <div className="container">
          <h1 className="logo">Matchbreaker</h1>
          <nav className="main-nav">
            {user ? (
              <div className="user-menu">
                <span className="user-email">Zalogowano jako: <strong>{user.email}</strong></span>
                <button onClick={handleLogout} className="button-turn-off" title="Wyloguj">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.016v9.968" />
                    <path d="M18.4 4.016a9 9 0 1 1-12.8 0" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="guest-menu">
                <p className="guest-greeting">Witaj, gościu!</p>
              </div>
            )}
          </nav>
        </div>
      </header>
      <div className="filters-bar">
        <div className="container">
          <nav className="filters">
            <button className={`filter-btn ${activeFilter === 'historyczny' ? 'active' : ''}`} data-filter="historyczny" onClick={() => handleFilterClick('historyczny')}>Historyczne</button>
            <button className={`filter-btn ${activeFilter === 'aktywny' ? 'active' : ''}`} data-filter="aktywny" onClick={() => handleFilterClick('aktywny')}>Aktywne</button>
            <button className={`filter-btn ${activeFilter === 'wyszukiwarka' ? 'active' : ''}`} data-filter="wyszukiwarka" onClick={() => handleFilterClick('wyszukiwarka')}>Wyszukiwarka</button>
            <button className={`filter-btn ${activeFilter === 'statystyki' ? 'active' : ''}`} data-filter="statystyki" onClick={() => handleFilterClick('statystyki')}>Statystyki</button>
          </nav>
        </div>
      </div>

      <main className="container">
        {needsLogin ? (
          <LoginPrompt />
        ) : (
          <>
            {activeFilter === 'wyszukiwarka' && <SearchSection />}
            {activeFilter === 'statystyki' && <div className="empty-state">Sekcja Statystyk (w budowie)</div>}
            {(activeFilter === 'aktywny' || activeFilter === 'historyczny') && (
              <>
                {filteredTips.length > 0 ? (
                  <div id="tips-container">{filteredTips.map(tip => <TipCard key={tip.id} tip={tip} />)}</div>
                ) : (
                  <p className="empty-state">Brak typów w tej sekcji.</p>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
