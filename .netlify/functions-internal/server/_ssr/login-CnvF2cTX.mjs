import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BXRCqFJ5.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-B5KeBcGk.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SITE_QUERY_KEYS, f as fetchSiteSettings, i as Logo, n as Input, o as Toaster$1, r as Label, t as Button } from "./site-data-Dzpbp1nl.mjs";
import { M as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CnvF2cTX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { isAdmin, loading } = useAuth();
	const navigate = useNavigate();
	const { data: settings } = useQuery({
		queryKey: SITE_QUERY_KEYS.settings,
		queryFn: fetchSiteSettings
	});
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [initialized, setInitialized] = (0, import_react.useState)(null);
	const [setupMode, setSetupMode] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && isAdmin) navigate({ to: "/admin" });
	}, [
		loading,
		isAdmin,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		fetch(`https://zuwuqezzhbpedgnmyjzm.supabase.co/functions/v1/admin-setup`, { headers: { apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1d3VxZXp6aGJwZWRnbm15anptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2Mzc2MjQsImV4cCI6MjA5ODIxMzYyNH0.REUOWITKqKx4aWZj56tpyz_4C1ONi_Cj4XxvqdnW_cs" } }).then((r) => r.json()).then((d) => {
			setInitialized(Boolean(d.initialized));
			setSetupMode(!d.initialized);
		}).catch(() => setInitialized(true));
	}, []);
	const onSignIn = async (e) => {
		e.preventDefault();
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Signed in");
		navigate({ to: "/admin" });
	};
	const onSetup = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			const res = await fetch(`https://zuwuqezzhbpedgnmyjzm.supabase.co/functions/v1/admin-setup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1d3VxZXp6aGJwZWRnbm15anptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2Mzc2MjQsImV4cCI6MjA5ODIxMzYyNH0.REUOWITKqKx4aWZj56tpyz_4C1ONi_Cj4XxvqdnW_cs"
				},
				body: JSON.stringify({
					email,
					password
				})
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error ?? "Setup failed");
			toast.success("Admin created — signing you in…");
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			navigate({ to: "/admin" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Setup failed");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center px-4 marble-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl glass-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						settings: settings ?? null,
						className: "h-12 w-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg text-[var(--burgundy)]",
						children: settings?.business_name ?? "Mahadev Aluminium"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "Admin Panel"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-2xl text-[var(--burgundy)]",
					children: setupMode ? "Create the first admin" : "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: setupMode ? "No admin exists yet. Set your secure email and password to take ownership." : "Enter your credentials to manage the website."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 grid gap-3",
					onSubmit: setupMode ? onSetup : onSignIn,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									required: true,
									minLength: setupMode ? 8 : void 0,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									autoComplete: setupMode ? "new-password" : "current-password"
								}),
								setupMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Minimum 8 characters. Pick something strong."
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "mt-2 rounded-full burgundy-gradient text-white",
							children: busy ? "Please wait…" : setupMode ? "Create admin & sign in" : "Sign in"
						})
					]
				}),
				initialized && !setupMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[11px] text-center text-muted-foreground",
					children: "Forgot your password? Reset it from the Supabase dashboard."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs text-muted-foreground hover:text-[var(--burgundy)]",
						children: "← Back to website"
					})
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
