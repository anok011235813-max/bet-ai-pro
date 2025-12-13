// Plik: app/api/search-team/matches/route.ts (Twój działający kod)
import { createClient } from '@/utils/supabase'; // Używamy standardowego klienta
import { NextRequest, NextResponse } from 'next/server';

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

export async function POST(request: NextRequest) {
  const { teamName, startYear } = await request.json();

  if (!teamName || !startYear) {
    return NextResponse.json({ error: 'Brak parametrów' }, { status: 400 });
  }

  const supabase = createClient();
  const startDate = `${startYear}-01-01`;

  const { data, error } = await supabase
    .from('team_breaks')
    .select('Date, Competition, "home team", "away team", "ht result", "ft result", Year')
    .gte('Year', startYear)
    .or(`"home team".eq.${teamName},"away team".eq.${teamName}`)
    .order('Year', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const sorted = (data || []).sort((a, b) => {
    const dateA = parseDate(a.Date);
    const dateB = parseDate(b.Date);
    return dateB.getTime() - dateA.getTime();
  });

  return NextResponse.json(sorted);
}
