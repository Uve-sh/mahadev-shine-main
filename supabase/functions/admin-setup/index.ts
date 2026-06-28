// Secure first-admin bootstrap.
// - GET  -> { initialized: boolean }
// - POST -> create the first admin user if none exist yet.
//   Body: { email, password }
// Uses the service role on the server only. After an admin exists, further
// POST attempts are rejected so the endpoint cannot be abused.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: cors });
}

async function adminCount(admin: ReturnType<typeof createClient>) {
  const { count, error } = await admin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if (error) throw error;
  return count ?? 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  try {
    if (req.method === "GET") {
      const count = await adminCount(admin);
      return json({ initialized: count > 0 });
    }

    if (req.method === "POST") {
      const count = await adminCount(admin);
      if (count > 0) {
        return json({ error: "Admin already initialized." }, 409);
      }

      const body = (await req.json().catch(() => null)) as
        | { email?: string; password?: string }
        | null;
      const email = body?.email?.trim().toLowerCase();
      const password = body?.password ?? "";

      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return json({ error: "A valid email is required." }, 400);
      }
      if (password.length < 8) {
        return json({ error: "Password must be at least 8 characters." }, 400);
      }

      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (createErr || !created.user) {
        return json({ error: createErr?.message ?? "Failed to create user." }, 400);
      }

      const { error: roleErr } = await admin
        .from("user_roles")
        .insert({ user_id: created.user.id, role: "admin" });
      if (roleErr) {
        await admin.auth.admin.deleteUser(created.user.id);
        return json({ error: roleErr.message }, 500);
      }

      return json({ ok: true });
    }

    return json({ error: "Method not allowed" }, 405);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return json({ error: message }, 500);
  }
});
