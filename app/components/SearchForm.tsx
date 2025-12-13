// Plik: app/components/SearchForm.tsx (Wersja z poprawną wielkością liter w nagłówkach)
'use client';

import { useState } from 'react';

interface Match {
  Date: string;
  Competition: string;
  'home team': string;
  'away team': string;
  'ht result': string;
  'ft result': string;
}

export default function SearchForm() {
  const [teamInput, setTeamInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (value: string) => {
    setTeamInput(value);
    setSelectedTeam('');
    
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/api/search-team/suggestions?q=${value}`);
    const data = await response.json();
    setSuggestions(data);
  };

  const selectTeam = (team: string) => {
    setSelectedTeam(team);
    setTeamInput(team);
    setSuggestions([]);
  };

  const searchMatches = async () => {
    if (!selectedTeam) {
      alert('Wybierz drużynę z listy sugestii.');
      return;
    }

    setLoading(true);
    setMatches([]);
    const response = await fetch('/api/search-team/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName: selectedTeam, startYear }),
    });

    const data = await response.json();
    setMatches(data);
    setLoading(false);
  };
  
  const cleanScore = (score: string) => {
    return score ? score.replace(/'/g, '') : '';
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  return (
    <div className="search-section">
      <div className="search-form-controls">
        <div className="input-group">
          <label>Nazwa drużyny:</label>
          <div className="autocomplete-wrapper">
            <input
              type="text"
              value={teamInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Wpisz co najmniej 3 litery..."
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((team, idx) => (
                  <li key={idx} onClick={() => selectTeam(team)}>
                    {team}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="input-group">
          <label>Od roku:</label>
          <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button onClick={searchMatches} disabled={loading}>
          {loading ? 'Szukam...' : 'Szukaj'}
        </button>
      </div>

      {matches.length > 0 && (
        <div className="results-table-container">
          <h3>Znaleziono {matches.length} meczów dla: {selectedTeam}</h3>
          <table className="matches-table">
            <thead>
              {/* === ZMIANA WIELKOŚCI LITER TUTAJ === */}
              <tr>
                <th>Data</th>
                <th>Rozgrywki</th>
                <th>Gospodarze</th>
                <th>Goście</th>
                <th>Wynik</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, idx) => (
                <tr key={idx}>
                  <td>{match.Date}</td>
                  <td>{match.Competition}</td>
                  <td className={match['home team'] === selectedTeam ? 'highlight-team' : ''}>
                    {match['home team']}
                  </td>
                  <td className={match['away team'] === selectedTeam ? 'highlight-team' : ''}>
                    {match['away team']}
                  </td>
                  <td className="result-cell">
                    {cleanScore(match['ft result'])} ({cleanScore(match['ht result'])})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
