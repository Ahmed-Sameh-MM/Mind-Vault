import "server-only";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Redirect logged-in users away from public pages (login/register)
export async function redirectIfUserAuthenticated(destination = "/dashboard") {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (!error && data?.claims) {
    redirect(destination);
  }
}

// Protect private pages
export async function requireAuth(destination = "/") {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect(destination);
  }
}