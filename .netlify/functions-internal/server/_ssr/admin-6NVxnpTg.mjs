import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BXRCqFJ5.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-B5KeBcGk.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as SITE_QUERY_KEYS, d as fetchServices, f as fetchSiteSettings, i as Logo, l as fetchGalleryItems, n as Input, o as Toaster$1, r as Label, s as cn, t as Button, u as fetchReviews } from "./site-data-Dzpbp1nl.mjs";
import { t as Textarea } from "./textarea-BtvIkvO6.mjs";
import { M as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { _ as Image, a as Trash2, b as Eye, d as MessageSquare, g as LogOut, l as Phone, n as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-6NVxnpTg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function AdminPage() {
	const { user, isAdmin, loading, signOut } = useAuth();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: settings } = useQuery({
		queryKey: SITE_QUERY_KEYS.settings,
		queryFn: fetchSiteSettings
	});
	(0, import_react.useEffect)(() => {
		if (!loading && (!user || !isAdmin)) navigate({ to: "/login" });
	}, [
		loading,
		user,
		isAdmin,
		navigate
	]);
	const inquiriesQ = useQuery({
		queryKey: SITE_QUERY_KEYS.inquiries,
		queryFn: async () => {
			const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		},
		enabled: isAdmin
	});
	const servicesQ = useQuery({
		queryKey: SITE_QUERY_KEYS.services,
		queryFn: fetchServices,
		enabled: isAdmin
	});
	const galleryQ = useQuery({
		queryKey: SITE_QUERY_KEYS.galleryItems,
		queryFn: fetchGalleryItems,
		enabled: isAdmin
	});
	useQuery({
		queryKey: SITE_QUERY_KEYS.reviews,
		queryFn: fetchReviews,
		enabled: isAdmin
	});
	const visitsQ = useQuery({
		queryKey: ["site_visits_count"],
		queryFn: async () => {
			const { count } = await supabase.from("site_visits").select("id", {
				count: "exact",
				head: true
			});
			return count ?? 0;
		},
		enabled: isAdmin
	});
	if (loading || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center text-sm text-muted-foreground",
		children: "Checking access…"
	});
	const stats = [
		{
			label: "Visitors",
			value: visitsQ.data ?? "—",
			icon: Eye
		},
		{
			label: "Gallery",
			value: galleryQ.data?.length ?? "—",
			icon: Image
		},
		{
			label: "Services",
			value: servicesQ.data?.length ?? "—",
			icon: Users
		},
		{
			label: "Inquiries",
			value: inquiriesQ.data?.length ?? "—",
			icon: MessageSquare
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							settings: settings ?? null,
							className: "h-10 w-10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-base text-[var(--burgundy)]",
							children: settings?.business_name ?? "Mahadev Aluminium"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
							children: "Admin Dashboard"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-xs text-muted-foreground hover:text-[var(--burgundy)]",
							children: "View site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => signOut().then(() => navigate({ to: "/login" })),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 mr-1.5" }), "Sign out"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: stats.map(({ label, value, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-[var(--burgundy)]" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 font-display text-3xl text-[var(--burgundy)]",
							children: value
						})]
					}, label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "inquiries",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "flex flex-wrap h-auto gap-1 p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "inquiries",
									children: "Inquiries"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "business",
									children: "Business Info"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "hero",
									children: "Homepage"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "services",
									children: "Services"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "gallery",
									children: "Gallery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "reviews",
									children: "Reviews"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "appearance",
									children: "Appearance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "seo",
									children: "SEO"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "inquiries",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiriesPanel, {
								inquiries: inquiriesQ.data ?? [],
								onChange: () => qc.invalidateQueries({ queryKey: SITE_QUERY_KEYS.inquiries })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "business",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsForm, { group: "business" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "hero",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsForm, { group: "hero" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "services",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudList, { kind: "services" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "gallery",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudList, { kind: "gallery" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "reviews",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudList, { kind: "reviews" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "appearance",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsForm, { group: "appearance" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "seo",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsForm, { group: "seo" })
						})
					]
				})]
			})
		]
	});
}
function InquiriesPanel({ inquiries, onChange }) {
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = inquiries.filter((i) => [
		i.name,
		i.phone_number,
		i.product_required,
		i.message,
		i.address
	].filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase()));
	const updateStatus = async (id, status) => {
		const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Updated");
			onChange();
		}
	};
	const del = async (id) => {
		if (!confirm("Delete this inquiry?")) return;
		const { error } = await supabase.from("inquiries").delete().eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Deleted");
			onChange();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 border-b border-border flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Search inquiries…",
				value: q,
				onChange: (e) => setQ(e.target.value),
				className: "max-w-xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: filtered.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y divide-border",
			children: [filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 text-center text-sm text-muted-foreground",
				children: "No inquiries yet."
			}) : null, filtered.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 grid gap-3 sm:grid-cols-[1fr_auto] items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[var(--burgundy)]",
								children: i.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: i.status === "completed" ? "default" : i.status === "contacted" ? "secondary" : "outline",
								children: i.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: new Date(i.created_at).toLocaleString()
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-sm flex flex-wrap gap-4 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "inline-flex items-center gap-1 hover:text-[var(--burgundy)]",
								href: `tel:${i.phone_number}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), i.phone_number]
							}),
							i.product_required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Product: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-foreground",
								children: i.product_required
							})] }) : null,
							i.measurements ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Size: ", i.measurements] }) : null
						]
					}),
					i.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: i.message
					}) : null,
					i.address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: i.address
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 justify-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => updateStatus(i.id, "pending"),
							children: "Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => updateStatus(i.id, "contacted"),
							children: "Contacted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => updateStatus(i.id, "completed"),
							children: "Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => del(i.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				})]
			}, i.id))]
		})]
	});
}
var FIELD_GROUPS = {
	business: [
		{
			label: "Business Name",
			key: "business_name"
		},
		{
			label: "Tagline",
			key: "tagline"
		},
		{
			label: "Owner Name",
			key: "owner_name"
		},
		{
			label: "Owner Photo URL",
			key: "owner_photo_url"
		},
		{
			label: "Phone (primary)",
			key: "phone_primary"
		},
		{
			label: "Phone (secondary)",
			key: "phone_secondary"
		},
		{
			label: "WhatsApp Number",
			key: "whatsapp_number"
		},
		{
			label: "Email",
			key: "email"
		},
		{
			label: "Address",
			key: "address_line",
			type: "textarea"
		},
		{
			label: "City",
			key: "city"
		},
		{
			label: "District",
			key: "district"
		},
		{
			label: "State",
			key: "state"
		},
		{
			label: "Postal Code",
			key: "postal_code"
		},
		{
			label: "Google Maps URL",
			key: "google_maps_url"
		},
		{
			label: "Google Business Profile URL",
			key: "google_business_profile_url"
		},
		{
			label: "GST Number",
			key: "gst_number"
		},
		{
			label: "Years of Experience",
			key: "years_experience",
			type: "number"
		},
		{
			label: "Business Description",
			key: "business_description",
			type: "textarea"
		},
		{
			label: "About Content",
			key: "about_content",
			type: "textarea"
		}
	],
	hero: [
		{
			label: "Hero Heading",
			key: "hero_heading"
		},
		{
			label: "Hero Subheading",
			key: "hero_subheading",
			type: "textarea"
		},
		{
			label: "Hero Image URL",
			key: "hero_image_url"
		},
		{
			label: "Hero QR Image URL",
			key: "hero_qr_image_url"
		},
		{
			label: "Primary CTA Label",
			key: "hero_cta_primary_label"
		},
		{
			label: "Primary CTA URL",
			key: "hero_cta_primary_url"
		},
		{
			label: "Secondary CTA Label",
			key: "hero_cta_secondary_label"
		},
		{
			label: "Secondary CTA URL",
			key: "hero_cta_secondary_url"
		},
		{
			label: "Tertiary CTA Label",
			key: "hero_cta_tertiary_label"
		},
		{
			label: "Tertiary CTA URL",
			key: "hero_cta_tertiary_url"
		}
	],
	appearance: [
		{
			label: "Logo URL",
			key: "logo_url"
		},
		{
			label: "Logo Mark URL",
			key: "logo_mark_url"
		},
		{
			label: "Favicon URL",
			key: "favicon_url"
		},
		{
			label: "Primary Color (hex)",
			key: "primary_color",
			type: "color"
		},
		{
			label: "Secondary Color (hex)",
			key: "secondary_color",
			type: "color"
		},
		{
			label: "Background Color (hex)",
			key: "background_color",
			type: "color"
		},
		{
			label: "Text Color (hex)",
			key: "text_color",
			type: "color"
		},
		{
			label: "Heading Font",
			key: "heading_font"
		},
		{
			label: "Body Font",
			key: "body_font"
		}
	],
	seo: [{
		label: "Open Graph Image URL",
		key: "og_image_url"
	}]
};
function SettingsForm({ group }) {
	const qc = useQueryClient();
	const { data: settings } = useQuery({
		queryKey: SITE_QUERY_KEYS.settings,
		queryFn: fetchSiteSettings
	});
	const [form, setForm] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!settings) return;
		const next = {};
		for (const f of FIELD_GROUPS[group]) {
			const v = settings[f.key];
			next[f.key] = v == null ? "" : String(v);
		}
		setForm(next);
	}, [settings, group]);
	const save = async () => {
		if (!settings) return;
		const payload = {};
		for (const f of FIELD_GROUPS[group]) {
			const v = form[f.key];
			payload[f.key] = f.type === "number" ? v ? Number(v) : null : v === "" ? null : v;
		}
		const { error } = await supabase.from("site_settings").update(payload).eq("id", settings.id);
		if (error) toast.error(error.message);
		else {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: SITE_QUERY_KEYS.settings });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-6 grid gap-4 sm:grid-cols-2",
		children: [FIELD_GROUPS[group].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `grid gap-1.5 ${f.type === "textarea" ? "sm:col-span-2" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: f.label
			}), f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 3,
				value: form[f.key] ?? "",
				onChange: (e) => setForm({
					...form,
					[f.key]: e.target.value
				})
			}) : f.type === "color" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "color",
					value: form[f.key] || "#000000",
					onChange: (e) => setForm({
						...form,
						[f.key]: e.target.value
					}),
					className: "h-10 w-16 p-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form[f.key] ?? "",
					onChange: (e) => setForm({
						...form,
						[f.key]: e.target.value
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: f.type === "number" ? "number" : "text",
				value: form[f.key] ?? "",
				onChange: (e) => setForm({
					...form,
					[f.key]: e.target.value
				})
			})]
		}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:col-span-2 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				className: "rounded-full burgundy-gradient text-white",
				children: "Save changes"
			})
		})]
	});
}
var KIND_CONFIG = {
	services: {
		table: "services",
		fields: [
			{
				key: "title",
				label: "Title"
			},
			{
				key: "slug",
				label: "Slug"
			},
			{
				key: "icon_name",
				label: "Icon name (lucide)"
			},
			{
				key: "short_description",
				label: "Short description",
				type: "textarea"
			},
			{
				key: "description",
				label: "Long description",
				type: "textarea"
			},
			{
				key: "image_url",
				label: "Image URL"
			},
			{
				key: "sort_order",
				label: "Order",
				type: "number"
			}
		],
		required: [
			"title",
			"slug",
			"icon_name",
			"short_description"
		]
	},
	gallery: {
		table: "gallery_items",
		fields: [
			{
				key: "title",
				label: "Title"
			},
			{
				key: "caption",
				label: "Caption",
				type: "textarea"
			},
			{
				key: "image_url",
				label: "Image URL"
			},
			{
				key: "sort_order",
				label: "Order",
				type: "number"
			}
		],
		required: ["title", "image_url"]
	},
	reviews: {
		table: "reviews",
		fields: [
			{
				key: "customer_name",
				label: "Customer Name"
			},
			{
				key: "location",
				label: "Location"
			},
			{
				key: "rating",
				label: "Rating (1–5)",
				type: "number"
			},
			{
				key: "review_text",
				label: "Review",
				type: "textarea"
			},
			{
				key: "customer_image_url",
				label: "Customer Image URL"
			},
			{
				key: "sort_order",
				label: "Order",
				type: "number"
			}
		],
		required: ["customer_name", "review_text"]
	}
};
function CrudList({ kind }) {
	const cfg = KIND_CONFIG[kind];
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin", kind],
		queryFn: async () => {
			const { data, error } = await supabase.from(cfg.table).select("*").order("sort_order", { ascending: true });
			if (error) throw error;
			return data;
		}
	});
	const [draft, setDraft] = (0, import_react.useState)({});
	const add = useMutation({
		mutationFn: async () => {
			for (const r of cfg.required) if (!draft[r]) throw new Error(`${r} is required`);
			const payload = {};
			for (const f of cfg.fields) {
				const v = draft[f.key];
				if (v == null || v === "") continue;
				payload[f.key] = f.type === "number" ? Number(v) : v;
			}
			const { error } = await supabase.from(cfg.table).insert(payload);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Added");
			setDraft({});
			qc.invalidateQueries({ queryKey: ["admin", kind] });
			qc.invalidateQueries({ queryKey: [cfg.table] });
		},
		onError: (e) => toast.error(e.message)
	});
	const del = async (id) => {
		if (!confirm("Delete this item?")) return;
		const { error } = await supabase.from(cfg.table).delete().eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["admin", kind] });
			qc.invalidateQueries({ queryKey: [cfg.table] });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-card divide-y divide-border",
			children: [(data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 text-center text-sm text-muted-foreground",
				children: "No items yet."
			}) : null, (data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-start gap-3",
				children: [
					"image_url" in row && row.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: row.image_url,
						alt: "",
						className: "h-14 w-14 rounded-lg object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 w-14 rounded-lg bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-[var(--burgundy)] truncate",
							children: row.title || row.customer_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground truncate",
							children: row.short_description || row.caption || row.review_text
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => del(row.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			}, row.id))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-card p-5 grid gap-3 h-fit",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-[var(--burgundy)]",
					children: "Add new"
				}),
				cfg.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
						children: f.label
					}), f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: draft[f.key] ?? "",
						onChange: (e) => setDraft({
							...draft,
							[f.key]: e.target.value
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: f.type === "number" ? "number" : "text",
						value: draft[f.key] ?? "",
						onChange: (e) => setDraft({
							...draft,
							[f.key]: e.target.value
						})
					})]
				}, f.key)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => add.mutate(),
					disabled: add.isPending,
					className: "rounded-full burgundy-gradient text-white",
					children: add.isPending ? "Saving…" : "Add"
				})
			]
		})]
	});
}
//#endregion
export { AdminPage as component };
