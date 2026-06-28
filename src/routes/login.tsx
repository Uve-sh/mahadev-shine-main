import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteSettings, SITE_QUERY_KEYS } from "@/lib/site-data";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login · Mahadev Aluminium" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { data: settings } = useQuery({ queryKey: SITE_QUERY_KEYS.settings, queryFn: fetchSiteSettings });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [initialized, setInitialized] = useState<boolean | null>(null);
  const [setupMode, setSetupMode] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin) navigate({ to: "/admin" });
  }, [loading, isAdmin, navigate]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-setup`;
    fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "" } })
      .then((r) => r.json())
      .then((d) => { setInitialized(Boolean(d.initialized)); setSetupMode(!d.initialized); })
      .catch(() => setInitialized(true));
  }, []);

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Signed in");
    navigate({ to: "/admin" });
  };

  const onSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-setup`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Setup failed");
      toast.success("Admin created — signing you in…");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 marble-bg">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-md rounded-3xl glass-card p-8">
        <div className="flex items-center gap-3">
          <Logo settings={settings ?? null} className="h-12 w-12" />
          <div>
            <div className="font-display text-lg text-[var(--burgundy)]">{settings?.business_name ?? "Mahadev Aluminium"}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Admin Panel</div>
          </div>
        </div>
        <h1 className="mt-6 font-display text-2xl text-[var(--burgundy)]">
          {setupMode ? "Create the first admin" : "Sign in"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {setupMode
            ? "No admin exists yet. Set your secure email and password to take ownership."
            : "Enter your credentials to manage the website."}
        </p>
        <form className="mt-6 grid gap-3" onSubmit={setupMode ? onSetup : onSignIn}>
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="grid gap-1.5">
            <Label>Password</Label>
            <Input type="password" required minLength={setupMode ? 8 : undefined} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={setupMode ? "new-password" : "current-password"} />
            {setupMode ? <p className="text-[11px] text-muted-foreground">Minimum 8 characters. Pick something strong.</p> : null}
          </div>
          <Button type="submit" disabled={busy} className="mt-2 rounded-full burgundy-gradient text-white">
            {busy ? "Please wait…" : (setupMode ? "Create admin & sign in" : "Sign in")}
          </Button>
        </form>
        {initialized && !setupMode ? (
          <p className="mt-4 text-[11px] text-center text-muted-foreground">Forgot your password? Reset it from the Supabase dashboard.</p>
        ) : null}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-[var(--burgundy)]">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}
