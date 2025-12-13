// Plik: utils/supabase.ts

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Pobierz zmienne środowiskowe, które wcześniej zdefiniowaliśmy
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Stwórz i zwróć klienta Supabase
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
