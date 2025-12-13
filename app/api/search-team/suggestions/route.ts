// Plik: app/api/search-team/suggestions/route.ts (Twój działający kod)
import { createClient } from '@/utils/supabase'; // Używamy standardowego klienta dla App Router
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }

  const supabase = createClient();
  const searchTerm = `%${query}%`;

  const { data: homeTeams, error: homeError } = await supabase
    .from('team_breaks')
    .select('"home team"')
    .ilike('"home team"', searchTerm);

  const { data: awayTeams, error: awayError } = await supabase
    .from('team_breaks')
    .select('"away team"')
    .ilike('"away team"', searchTerm);

  if (homeError || awayError) {
    console.error("Błąd wyszukiwania ILIKE:", { homeError, awayError });
    return NextResponse.json({ error: 'Błąd podczas wyszukiwania w bazie danych' }, { status: 500 });
  }

  const allTeams = new Set<string>();
  homeTeams?.forEach(row => allTeams.add(row['home team']));
  awayTeams?.forEach(row => allTeams.add(row['away team']));

  const filtered = Array.from(allTeams).sort().slice(0, 20);

  return NextResponse.json(filtered);
}
