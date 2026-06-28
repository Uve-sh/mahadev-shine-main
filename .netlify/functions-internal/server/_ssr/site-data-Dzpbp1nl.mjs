import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BXRCqFJ5.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-data-Dzpbp1nl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function Logo({ settings, className }) {
	const url = settings?.logo_url || settings?.logo_mark_url;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative inline-flex items-center justify-center rounded-full p-[2px]", "gold-gradient shadow-[0_4px_24px_-8px_rgba(201,163,78,0.55)]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center rounded-full bg-[var(--background)]",
			children: url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: settings?.business_name ?? "Logo",
				className: "h-[78%] w-[78%] object-contain",
				loading: "eager"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg text-[var(--burgundy)]",
				children: "MA"
			})
		})
	});
}
async function fetchSiteSettings() {
	const { data, error } = await supabase.from("site_settings").select("*").order("created_at", { ascending: true }).limit(1).maybeSingle();
	if (error) throw error;
	return data;
}
async function fetchServices() {
	const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function fetchGalleryCategories() {
	const { data, error } = await supabase.from("gallery_categories").select("*").order("sort_order", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function fetchGalleryItems() {
	const { data, error } = await supabase.from("gallery_items").select("*").order("sort_order", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function fetchReviews() {
	const { data, error } = await supabase.from("reviews").select("*").order("sort_order", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
var SITE_QUERY_KEYS = {
	settings: ["site_settings"],
	services: ["services"],
	galleryCategories: ["gallery_categories"],
	galleryItems: ["gallery_items"],
	reviews: ["reviews"],
	projects: ["projects"],
	inquiries: ["inquiries"]
};
//#endregion
export { SITE_QUERY_KEYS as a, fetchGalleryCategories as c, fetchServices as d, fetchSiteSettings as f, Logo as i, fetchGalleryItems as l, Input as n, Toaster$1 as o, Label as r, cn as s, Button as t, fetchReviews as u };
