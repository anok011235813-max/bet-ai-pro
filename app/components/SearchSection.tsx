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

export default function SearchSection() {
  const [teamInput, setTeamInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [startYear, setStartYear] = useState(2020);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  // Autocomplete - pobierz sugestie
  const handleInputChange = async (value: string) => {
    setTeamInput(value);
    
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/api/search-team/suggestions?q=${value}`);
    const data = await response.json();
    setSuggestions(data);
  };

  // Wybierz drużynę z listy
  const selectTeam = (team: string) => {
    setSelectedTeam(team);
    setTeamInput(team);
    setSuggestions([]);
  };

  // Szukaj meczów
  const searchMatches = async () => {
    if (!selectedTeam) {
      alert('Wybierz drużynę z listy');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/search-team/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName: selectedTeam, startYear }),
    });

    const data = await response.json();
    setMatches(data);
    setLoading(false);
  };

  // Funkcja usuwająca apostrofy z wyników
  const cleanScore = (score: string) => {
    return score.replace(/'/g, '');
  };

  // Lata do wyboru
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  return (
    <div className="search-section">
      <div className="search-form">
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
        <div className="results">
          <h3>Znaleziono {matches.length} meczów dla: {selectedTeam}</h3>
          <table className="matches-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Rozgrywki</th>
                <th>Gospodarz</th>
                <th>Gość</th>
                <th>Wynik</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, idx) => {
                const isHomeTeam = match['home team'] === selectedTeam;
                const isAwayTeam = match['away team'] === selectedTeam;
                
                return (
                  <tr key={idx}>
                    <td>{match.Date}</td>
                    <td>{match.Competition}</td>
                    <td className={isHomeTeam ? 'highlight-team' : ''}>
                      {match['home team']}
                    </td>
                    <td className={isAwayTeam ? 'highlight-team' : ''}>
                      {match['away team']}
                    </td>
                    <td className="result-cell">
                      {cleanScore(match['ft result'])} ({cleanScore(match['ht result'])})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
