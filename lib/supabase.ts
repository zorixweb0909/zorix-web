const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabaseConfigured = Boolean(url && anon);

function headers(token?: string) {
  return {
    apikey: anon,
    Authorization: `Bearer ${token || anon}`,
    "Content-Type": "application/json",
  };
}

export async function authSignUp(email: string, password: string) {
  if (!supabaseConfigured) throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  const r = await fetch(`${url}/auth/v1/signup`, { method: "POST", headers: headers(), body: JSON.stringify({ email, password }) });
  const data = await r.json();
  if (!r.ok) throw new Error(data.msg || data.error_description || data.message || "Sign up failed.");
  return data;
}

export async function authSignIn(email: string, password: string) {
  if (!supabaseConfigured) throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  const r = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: headers(), body: JSON.stringify({ email, password }) });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error_description || data.msg || data.message || "Login failed.");
  return data;
}

export async function authUser(token: string) {
  const r = await fetch(`${url}/auth/v1/user`, { headers: headers(token) });
  if (!r.ok) return null;
  return r.json();
}

export async function db(path: string, token: string, init: RequestInit = {}) {
  const r = await fetch(`${url}/rest/v1/${path}`, { ...init, headers: { ...headers(token), ...(init.headers || {}) } });
  const text = await r.text();
  let data: any = null; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!r.ok) throw new Error(data?.message || data?.hint || data?.details || "Database request failed.");
  return data;
}
