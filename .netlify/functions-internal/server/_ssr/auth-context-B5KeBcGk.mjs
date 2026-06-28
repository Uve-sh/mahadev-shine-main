import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BXRCqFJ5.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-B5KeBcGk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
async function checkAdmin(userId) {
	if (!userId) return false;
	const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
	if (error) {
		console.warn("[auth] role check failed", error.message);
		return false;
	}
	return !!data;
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(async ({ data }) => {
			if (!active) return;
			setSession(data.session);
			setIsAdmin(await checkAdmin(data.session?.user.id));
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") return;
			setSession(newSession);
			setTimeout(async () => {
				setIsAdmin(await checkAdmin(newSession?.user.id));
			}, 0);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		session,
		user: session?.user ?? null,
		isAdmin,
		loading,
		signOut: async () => {
			await supabase.auth.signOut();
			setSession(null);
			setIsAdmin(false);
		},
		refreshRole: async () => setIsAdmin(await checkAdmin(session?.user.id))
	}), [
		session,
		isAdmin,
		loading
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
