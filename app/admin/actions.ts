// Plik: app/admin/actions.ts
'use server'

import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx';
import { revalidatePath } from 'next/cache';

// Utwórz klienta ADMINA (z pełnymi uprawnieniami)
const getAdminClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// --- SEKCJA 1: ZARZĄDZANIE UŻYTKOWNIKAMI ---

export async function createNewUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const validUntil = formData.get('valid_until') as string | null;

  const supabaseAdmin = getAdminClient();

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email, password: password, email_confirm: true,
  });

  if (authError) {
    console.error('Błąd tworzenia użytkownika w auth:', authError);
    return { success: false, message: 'Błąd tworzenia użytkownika w systemie autentykacji: ' + authError.message };
  }

  const userId = authData.user.id;

  const { error: profileError } = await supabaseAdmin
    .from('users')
    .update({ role: role, valid_until: validUntil || null, })
    .eq('id', userId);

  if (profileError) {
    console.error('Błąd aktualizacji profilu użytkownika:', profileError);
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return { success: false, message: 'Użytkownik został stworzony, ale wystąpił błąd przy nadawaniu mu roli: ' + profileError.message + '. Użytkownik został usunięty.' };
  }

  return { success: true, message: 'Użytkownik został pomyślnie stworzony!' };
}

export async function updateUser(formData: FormData) {
  const userId = formData.get('userId') as string;
  const role = formData.get('role') as string;
  const validUntil = formData.get('valid_until') as string | null;

  if (!userId) return { success: false, message: 'Brak ID użytkownika.' };
  
  const supabaseAdmin = getAdminClient();
  const { error } = await supabaseAdmin.from('users').update({ role: role, valid_until: validUntil || null }).eq('id', userId);

  if (error) return { success: false, message: 'Błąd aktualizacji: ' + error.message };
  return { success: true, message: 'Użytkownik zaktualizowany.' };
}

export async function deleteUser(userId: string) {
  if (!userId) return { success: false, message: 'Brak ID użytkownika.' };

  const supabaseAdmin = getAdminClient();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) return { success: false, message: 'Błąd usuwania: ' + error.message };
  return { success: true, message: 'Użytkownik usunięty.' };
}


// --- SEKCJA 2: IMPORT TYPÓW (XLSX) DO TABELI 'TIPS' ---

type TipFromExcel = {
  Kraj: string;
  Rozgrywki: string;
  Data: string | number;
  Godzina: string | number;
  Gospodarz: string;
  Gość: string;
  TeamInFocus: string;
  Status: 'Historyczny' | 'Aktywny';
  Kupon: string; // "Wygrany", "Przegrany", lub puste
  Wynik: string;
  [key: string]: any;
};

function parseExcelDateTime(date: string | number, time: string | number): string {
    let datePart: string;
    if (typeof date === 'number') {
        const d = XLSX.SSF.parse_date_code(date);
        datePart = `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`;
    } else {
        const dateStr = String(date);
        if (dateStr.includes('/')) {
            const parts = dateStr.split(' ')[0].split('/');
            const month = parts[0];
            const day = parts[1];
            let year = parts[2];
            if (year.length === 2) year = '20' + year;
            datePart = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        } else if (dateStr.includes('.')) {
            const parts = dateStr.split('.');
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            datePart = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        } else {
            throw new Error(`Nie rozpoznano formatu daty: ${dateStr}`);
        }
    }
    let timePart: string;
    if (typeof time === 'number') {
        const t = XLSX.SSF.parse_date_code(time);
        timePart = `${String(t.H).padStart(2, '0')}:${String(t.M).padStart(2, '0')}:00`;
    } else {
        timePart = `${String(time)}:00`;
    }
    return `${datePart} ${timePart}`;
}

function collectHistory(row: TipFromExcel): object[] {
    const historyEntries = [];
    for (let i = 1; i <= 12; i++) {
        if (row[`Historia${i}_Data`]) {
            historyEntries.push({
                date: row[`Historia${i}_Data`],
                homeTeam: row[`Historia${i}_Gospodarz`],
                awayTeam: row[`Historia${i}_Gosc`],
                score: row[`Historia${i}_Wynik`],
                league: row[`Historia${i}_Rozgrywki`],
            });
        }
    }
    return historyEntries;
}

export async function importTipsFromJSON(formData: FormData) {
  const file = formData.get('jsonFile') as File;
  if (!file) return { success: false, message: "Nie znaleziono pliku." };

  try {
    const bytes = await file.arrayBuffer();
    const workbook = XLSX.read(bytes);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tips: TipFromExcel[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    if (!Array.isArray(tips)) return { success: false, message: "Plik XLSX musi zawierać tablicę obiektów." };

    const supabaseAdmin = getAdminClient();

    const tipsToInsert = tips.map(tip => {
      let kuponValue = '';
      if (tip.Kupon) {
        const kuponStr = String(tip.Kupon).trim();
        if (kuponStr.toLowerCase() === 'wygrany') {
          kuponValue = 'Wygrany';
        } else if (kuponStr.toLowerCase() === 'przegrany') {
          kuponValue = 'Przegrany';
        }
      }

      return {
        kraj: tip.Kraj,
        rozgrywki: tip.Rozgrywki,
        data: String(tip.Data),
        godzina: String(tip.Godzina),
        gospodarz: tip.Gospodarz,
        gosc: tip.Gość,
        teaminfocus: tip.TeamInFocus,
        status: tip.Status === 'Historyczny' ? 'historyczny' : 'aktywny',
        kupon: kuponValue,
        wynik: tip.Wynik,
        historia: collectHistory(tip),
        match_datetime: parseExcelDateTime(tip.Data, tip.Godzina),
        is_public: true,
      };
    });

    const { error } = await supabaseAdmin.from('tips').insert(tipsToInsert);
    
    if (error) {
      console.error('Błąd importu Supabase:', error);
      return { success: false, message: `Błąd wstawiania danych do bazy: ${error.message}` };
    }

    return { success: true, message: `Pomyślnie zaimportowano ${tipsToInsert.length} typów.` };

  } catch (e: any) {
    console.error('Błąd przetwarzania pliku XLSX:', e);
    return { success: false, message: `Błąd przetwarzania pliku XLSX: ${e.message}` };
  }
}

// --- SEKCJA 3: IMPORT BEST OF H2H (JSON) DO TABELI 'BEST_H2H' ---

export async function importH2HFromJSON(formData: FormData) {
  const file = formData.get('jsonFile') as File;
  if (!file) return { success: false, message: "Nie znaleziono pliku JSON." };

  try {
    const text = await file.text();
    const h2hData = JSON.parse(text);

    if (!Array.isArray(h2hData)) {
        return { success: false, message: "Plik JSON musi zawierać tablicę obiektów." };
    }

    const supabaseAdmin = getAdminClient();

    const rowsToInsert = h2hData.map((item: any) => ({
        kraj: item.kraj,
        gospodarz: item.gospodarz,
        gosc: item.gosc,
        historia: item.historia,
        is_public: true
    }));

    const { error } = await supabaseAdmin.from('best_h2h').insert(rowsToInsert);

    if (error) {
        console.error('Błąd importu H2H:', error);
        return { success: false, message: `Błąd bazy danych: ${error.message}` };
    }

    return { success: true, message: `Pomyślnie zaimportowano ${rowsToInsert.length} par H2H.` };

  } catch (e: any) {
    console.error('Błąd przetwarzania JSON:', e);
    return { success: false, message: `Niepoprawny format pliku JSON: ${e.message}` };
  }
}

// --- SEKCJA 4: IMPORT TEAM BREAKS (CSV) DO TABELI 'TEAM_BREAKS' ---

export async function importBreaksFromCSV(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) return { success: false, message: "Nie znaleziono pliku." };

  try {
    const text = await file.text();
    const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);

    if (rows.length < 2) return { success: false, message: 'Plik jest pusty lub zawiera tylko nagłówek' };

    const supabaseAdmin = getAdminClient();

    // 1. Mapowanie CSV na JSON
    const headers = rows[0].replace(/^[\ufeff]/, '').split(';').map(h => h.trim());

    const dataToInsert = rows.slice(1).map((row) => {
      const values = row.split(';');
      if (values.length < headers.length) return null;

      return {
        // Używamy pełnej nazwy kolumny "Country/Continent" zgodnej z bazą
        "Country/Continent": values[0]?.trim(), 
        "Competition": values[1]?.trim(),
        "Date": values[2]?.trim(),
        "Month": parseInt(values[3]?.trim()) || 0,
        "Year": parseInt(values[4]?.trim()) || 0,
        "home team": values[5]?.trim(),
        "away team": values[6]?.trim(),
        "ht result": values[7]?.trim().replace(/'/g, ''),
        "ft result": values[8]?.trim().replace(/'/g, ''),
        "HT": values[9]?.trim(),
        "FT": values[10]?.trim(),
        "Break": values[11]?.trim()
      };
    }).filter(item => item !== null);

    // 2. WYWOŁANIE FUNKCJI RPC (Zamiast delete/insert)
    // To wywoła nasz kod SQL (import_team_breaks), który poradzi sobie ze slashem w nazwie kolumny
    const { error } = await supabaseAdmin.rpc('import_team_breaks', { 
      payload: dataToInsert 
    });

    if (error) {
      console.error('Błąd RPC:', error);
      return { success: false, message: 'Błąd importu SQL: ' + error.message };
    }

    // 3. Odświeżenie
    revalidatePath('/search'); 

    return { success: true, message: `Sukces! Podmieniono dane w team_breaks. Zaimportowano ${dataToInsert.length} wierszy.` };

  } catch (e: any) {
    console.error('Wyjątek importu team_breaks:', e);
    return { success: false, message: 'Krytyczny błąd importu: ' + e.message };
  }
}
