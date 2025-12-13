// Plik: proxy.ts (wersja z logiką blokującą)
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Tworzymy klienta Supabase wewnątrz proxy
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Pobieramy informacje o użytkowniku
  const { data: { user } } = await supabase.auth.getUser()

  // --- NOWA LOGIKA BLOKUJĄCA ---
  // Jeśli użytkownik NIE jest zalogowany I próbuje wejść na stronę /premium lub /admin
  if (!user && (request.nextUrl.pathname.startsWith('/premium') || request.nextUrl.pathname.startsWith('/admin'))) {
    // Przekierowujemy go na stronę logowania
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Dla wszystkich innych przypadków, kontynuujemy normalnie
  return response
}

export const config = {
  matcher: [
    /*
     * Dopasuj wszystkie ścieżki z wyjątkiem tych, które zaczynają się od:
     * - api (trasy API)
     * - _next/static (pliki statyczne)
     * - _next/image (pliki obrazów)
     * - favicon.ico (ikona fav)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
