// Plik: utils/supabase-server.ts (poprawiona wersja dla Next.js 15+)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type CookieOptions } from '@supabase/ssr'

// Zmieniamy funkcję na asynchroniczną, aby móc użyć 'await'
export async function createServerSupabaseClient() {
  // 1. Czekamy, aż 'ciasteczka' zostaną w pełni załadowane
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 2. Definiujemy, jak Supabase ma pobierać, ustawiać i usuwać ciasteczka
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ta metoda może być wywołana z komponentu serwerowego, co jest normalne.
            // Można to zignorować, jeśli masz middleware odświeżający sesje.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Jak wyżej.
          }
        },
      },
    }
  )
}
