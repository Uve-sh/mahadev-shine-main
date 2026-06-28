import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BXRCqFJ5.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SITE_QUERY_KEYS, c as fetchGalleryCategories, d as fetchServices, f as fetchSiteSettings, i as Logo, l as fetchGalleryItems, n as Input, o as Toaster$1, r as Label, s as cn, t as Button, u as fetchReviews } from "./site-data-Dzpbp1nl.mjs";
import { t as Textarea } from "./textarea-BtvIkvO6.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as ArrowUp, E as CircleCheck, S as Award, T as Sparkles, c as Send, f as MessageCircle, h as Mail, i as Truck, l as Phone, m as MapPin, o as Star, p as Menu, r as Upload, s as ShieldCheck, t as X, u as Palette, v as Hammer, w as ArrowRight, x as Clock, y as Globe } from "../_libs/lucide-react.mjs";
import "./router-XgkZD0F0.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cxqwwm0W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_aluminium_default = "/assets/hero-aluminium-IeDH5g8q.jpg";
var LANG_KEY = "mahadev_lang";
function setCookie(value) {
	const v = `/en/${value}`;
	const expires = new Date(Date.now() + 720 * 60 * 60 * 1e3).toUTCString();
	document.cookie = `googtrans=${v}; expires=${expires}; path=/`;
	const host = window.location.hostname.split(".").slice(-2).join(".");
	if (host) document.cookie = `googtrans=${v}; expires=${expires}; path=/; domain=.${host}`;
}
function LanguageSwitcher() {
	const initialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (initialized.current) return;
		initialized.current = true;
		const stored = localStorage.getItem(LANG_KEY) || "en";
		if (stored && stored !== "en") setCookie(stored);
		window.googleTranslateElementInit = () => {
			if (!window.google?.translate) return;
			new window.google.translate.TranslateElement({
				pageLanguage: "en",
				includedLanguages: "en,gu,hi",
				autoDisplay: false
			}, "google_translate_element");
		};
		if (!document.getElementById("google-translate-script")) {
			const s = document.createElement("script");
			s.id = "google-translate-script";
			s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
			s.async = true;
			document.body.appendChild(s);
		}
	}, []);
	const onChange = (lang) => {
		localStorage.setItem(LANG_KEY, lang);
		setCookie(lang);
		const select = document.querySelector(".goog-te-combo");
		if (select) {
			select.value = lang;
			select.dispatchEvent(new Event("change"));
		} else window.location.reload();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2 py-1.5 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5 text-[var(--burgundy)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				"aria-label": "Select language",
				defaultValue: typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) || "en" : "en",
				onChange: (e) => onChange(e.target.value),
				className: "bg-transparent text-xs font-medium text-foreground outline-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "en",
						children: "EN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "gu",
						children: "ગુ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "hi",
						children: "हि"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "google_translate_element",
				className: "absolute -z-10 opacity-0 pointer-events-none"
			})
		]
	});
}
var links = [
	{
		href: "#home",
		label: "Home"
	},
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#services",
		label: "Services"
	},
	{
		href: "#gallery",
		label: "Gallery"
	},
	{
		href: "#projects",
		label: "Projects"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function Navbar({ settings }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(90,22,27,0.18)]" : "bg-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#home",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						settings,
						className: "h-10 w-10 lg:h-12 lg:w-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:block leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-base lg:text-lg text-[var(--burgundy)]",
							children: settings?.business_name ?? "Mahadev Aluminium"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.25em] text-[var(--gold-foreground)]/70",
							children: settings?.tagline ?? "Section & Door"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden lg:flex items-center gap-1",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						className: "relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-[var(--burgundy)] transition-colors group",
						children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 origin-left bg-[var(--gold)] transition-transform duration-300 group-hover:scale-x-100" })]
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 lg:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
						settings?.phone_primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${settings.phone_primary}`,
							className: "hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 px-3 py-2 text-xs font-medium text-[var(--burgundy)] hover:bg-[var(--gold)]/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), settings.phone_primary]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#quote",
							className: "hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white burgundy-gradient shadow-luxe hover:opacity-95 transition",
							children: "Get Quote"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle menu",
							onClick: () => setOpen((v) => !v),
							className: "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -8
			},
			className: "lg:hidden mx-4 mb-3 rounded-2xl glass-card p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "grid gap-1",
				children: [
					links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-3 text-sm font-medium hover:bg-[var(--gold)]/10",
						children: l.label
					}, l.href)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#quote",
						onClick: () => setOpen(false),
						className: "mt-2 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white burgundy-gradient",
						children: "Get Quote"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "mt-1 text-center text-[11px] uppercase tracking-widest text-muted-foreground",
						children: "Admin"
					})
				]
			})
		}) : null })]
	});
}
function FloatingButtons({ settings }) {
	const [showTop, setShowTop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShowTop(window.scrollY > 400);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const phone = settings?.phone_primary;
	const wa = (settings?.whatsapp_number || settings?.phone_primary || "").replace(/[^\d+]/g, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showTop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				initial: {
					opacity: 0,
					scale: .7
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .7
				},
				onClick: () => window.scrollTo({
					top: 0,
					behavior: "smooth"
				}),
				"aria-label": "Back to top",
				className: "inline-flex h-11 w-11 items-center justify-center rounded-full glass-card text-[var(--burgundy)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
			}, "top") : null }),
			phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `tel:${phone}`,
				"aria-label": "Call now",
				className: "inline-flex h-12 w-12 items-center justify-center rounded-full burgundy-gradient text-white shadow-luxe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
			}) : null,
			wa ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `https://wa.me/${wa.replace(/^\+/, "")}`,
				target: "_blank",
				rel: "noreferrer noopener",
				"aria-label": "WhatsApp",
				className: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" })
			}) : null
		]
	});
}
var whyIcons = [
	Sparkles,
	Hammer,
	ShieldCheck,
	Truck,
	Palette,
	Award
];
function Section({ id, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: `relative py-20 sm:py-28 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children
		})
	});
}
function SectionHeading({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl text-center mb-14",
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold-foreground)] bg-[var(--gold)]/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), eyebrow]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--burgundy)] text-balance",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto my-5 h-px w-24 gold-rule" }),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-balance",
				children: subtitle
			}) : null
		]
	});
}
function Hero({ settings }) {
	const phone = settings?.phone_primary;
	const wa = (settings?.whatsapp_number || phone || "").replace(/[^\d+]/g, "").replace(/^\+/, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		className: "relative min-h-[100svh] flex items-center overflow-hidden pt-24 lg:pt-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 -z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_aluminium_default,
					alt: "",
					className: "h-full w-full object-cover",
					width: 1792,
					height: 1152
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[var(--burgundy)]/85 via-[var(--burgundy)]/55 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-12 items-center gap-10 px-4 sm:px-6 lg:px-8 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 24
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .8 },
				className: "lg:col-span-7 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--gold)]" }), "Premium Aluminium Showroom · Botad"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-balance",
						children: settings?.hero_heading ?? "Crafted Aluminium. Timeless Elegance."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base sm:text-lg text-white/85 text-balance",
						children: settings?.hero_subheading ?? settings?.business_description ?? "Bespoke sliding doors, windows, glass partitions and ACP work — installed with precision by Mahadev Aluminium Section & Door."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${phone}`,
								className: "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--burgundy)] shadow-luxe hover:bg-white/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), "Call Now"]
							}) : null,
							wa ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/${wa}`,
								target: "_blank",
								rel: "noreferrer noopener",
								className: "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-luxe",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "WhatsApp"]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#quote",
								className: "inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[var(--gold)]/20 px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--gold)]/30",
								children: ["Get Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .92,
					rotate: -4
				},
				animate: {
					opacity: 1,
					scale: 1,
					rotate: -3
				},
				transition: {
					duration: .9,
					delay: .2
				},
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						animate: { y: [
							0,
							-8,
							0
						] },
						transition: {
							duration: 5,
							repeat: Infinity,
							ease: "easeInOut"
						},
						className: "aspect-[0.62] rounded-3xl glass-card p-6 flex flex-col items-center justify-between text-center bg-gradient-to-b from-white/90 to-white/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full flex items-start justify-between text-[var(--burgundy)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] tracking-[0.3em] uppercase opacity-70",
									children: "NFC · Tap"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] tracking-[0.3em] uppercase opacity-70",
									children: "मा·MA"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								settings,
								className: "h-24 w-24"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl text-[var(--burgundy)]",
								children: settings?.business_name ?? "Mahadev"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-[0.3em] text-[var(--gold-foreground)] mt-1",
								children: "Aluminium Section & Door"
							})] }),
							settings?.hero_qr_image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: settings.hero_qr_image_url,
								alt: "QR",
								className: "h-24 w-24 rounded-lg border border-[var(--gold)]/40 p-1 bg-white",
								loading: "lazy"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-24 w-24 rounded-lg border border-dashed border-[var(--gold)]/50 flex items-center justify-center text-[10px] text-muted-foreground",
								children: "QR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.3em] text-[var(--burgundy)]/70",
								children: "Scan to Connect"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-6 -z-10 rounded-[40px] bg-[var(--gold)]/20 blur-3xl" })]
				})
			})]
		})]
	});
}
function About({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "about",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "About Us",
			title: "A legacy of precision in every frame",
			subtitle: settings?.about_content ?? "Mahadev Aluminium Section & Door is a trusted name in Botad, delivering premium aluminium solutions with uncompromising quality and craftsmanship."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-3",
			children: [
				{
					icon: Award,
					k: "Experience",
					v: `${settings?.years_experience ?? 10}+ Years`,
					d: "Of trusted craftsmanship across homes, shops and offices."
				},
				{
					icon: ShieldCheck,
					k: "Quality Promise",
					v: "Premium Grade",
					d: "Only verified aluminium sections, hardware and toughened glass."
				},
				{
					icon: Sparkles,
					k: "Why Mahadev",
					v: "Showroom Finish",
					d: "Tailored design, on-time delivery and immaculate installation."
				}
			].map(({ icon: Icon, k, v, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					amount: .4
				},
				className: "rounded-3xl glass-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex h-11 w-11 items-center justify-center rounded-2xl gold-gradient text-[var(--burgundy)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: k
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl text-[var(--burgundy)] mt-1",
						children: v
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: d
					})
				]
			}, k))
		})]
	});
}
function WhyChooseUs({ settings }) {
	const items = Array.isArray(settings?.why_choose_us) ? settings.why_choose_us : [
		{
			title: "High Quality Materials",
			description: "Premium aluminium sections and hardware sourced from trusted brands."
		},
		{
			title: "Expert Installation",
			description: "Skilled fitters with years of on-site precision experience."
		},
		{
			title: "Affordable Pricing",
			description: "Transparent quotations with the best value in Botad."
		},
		{
			title: "On-Time Delivery",
			description: "Project timelines we commit to and proudly meet."
		},
		{
			title: "Custom Design",
			description: "Made-to-measure solutions tailored to your space."
		},
		{
			title: "Professional Service",
			description: "Courteous, responsive support from quote to handover."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		className: "marble-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Why Choose Us",
			title: "Built on trust, finished with luxury"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: items.slice(0, 6).map((item, i) => {
				const Icon = whyIcons[i % whyIcons.length];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 14
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						amount: .3
					},
					transition: { delay: i * .05 },
					className: "group relative rounded-3xl border border-border bg-card p-6 hover:shadow-luxe transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl burgundy-gradient text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-xl text-[var(--burgundy)]",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: item.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-6 bottom-3 h-px gold-rule opacity-0 group-hover:opacity-100 transition" })
					]
				}, item.title);
			})
		})]
	});
}
function ServicesGrid({ services }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "services",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Our Services",
			title: "Premium aluminium, beautifully engineered",
			subtitle: "From sliding doors to ACP cladding — a complete catalogue of bespoke aluminium solutions."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
				href: "#quote",
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					amount: .2
				},
				transition: { delay: i * .03 },
				className: "group relative overflow-hidden rounded-3xl border border-border bg-card p-6 hover:shadow-luxe transition",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl gold-gradient text-[var(--burgundy)] font-display text-xl",
							children: s.title.slice(0, 1)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-[var(--burgundy)] transition" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-xl text-[var(--burgundy)]",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground line-clamp-3",
						children: s.short_description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--burgundy)]",
						children: ["Learn More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--gold)]/15 blur-3xl group-hover:bg-[var(--gold)]/25 transition" })
				]
			}, s.id))
		})]
	});
}
function Gallery({ items, categories }) {
	const [active, setActive] = (0, import_react.useState)("all");
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => active === "all" ? items : items.filter((i) => i.category_id && categories.find((c) => c.id === i.category_id)?.slug === active), [
		items,
		categories,
		active
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "gallery",
		className: "marble-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Gallery",
				title: "Recent installations & finishes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					label: "All",
					active: active === "all",
					onClick: () => setActive("all")
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					label: c.name,
					active: active === c.slug,
					onClick: () => setActive(c.slug)
				}, c.id))]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted-foreground",
				children: "Gallery images will appear here soon."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setLightbox(it),
					className: "group overflow-hidden rounded-2xl border border-border bg-card shadow-luxe",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: it.image_url,
							alt: it.title,
							loading: "lazy",
							className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-base text-[var(--burgundy)]",
							children: it.title
						}), it.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground line-clamp-2",
							children: it.caption
						}) : null]
					})]
				}, it.id))
			}),
			lightbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4",
				onClick: () => setLightbox(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: lightbox.image_url,
					alt: lightbox.title,
					className: "max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
				})
			}) : null
		]
	});
}
function FilterChip({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${active ? "burgundy-gradient text-white shadow-luxe" : "border border-border bg-card hover:border-[var(--gold)]"}`,
		children: label
	});
}
function Process({ settings }) {
	const raw = settings?.process_steps;
	const steps = Array.isArray(raw) && raw.length > 0 ? raw : [
		{
			step: "Contact Us",
			description: "Reach out via call, WhatsApp or the quote form."
		},
		{
			step: "Site Visit",
			description: "Our team visits your site to understand the requirement."
		},
		{
			step: "Measurement",
			description: "Precise measurements taken on-site."
		},
		{
			step: "Quotation",
			description: "Transparent estimate tailored to your project."
		},
		{
			step: "Fabrication",
			description: "Crafted in our workshop with premium materials."
		},
		{
			step: "Installation",
			description: "Clean, careful installation by expert fitters."
		},
		{
			step: "Final Inspection",
			description: "Quality check and handover with your approval."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "process",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Our Process",
			title: "From first call to final inspection"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative grid gap-6 md:grid-cols-2 lg:grid-cols-7",
			children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
				initial: {
					opacity: 0,
					y: 14
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					amount: .3
				},
				transition: { delay: i * .04 },
				className: "relative rounded-2xl glass-card p-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full burgundy-gradient text-white font-display",
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mt-3 font-display text-base text-[var(--burgundy)]",
						children: s.step
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: s.description
					})
				]
			}, i))
		})]
	});
}
function Reviews({ reviews }) {
	if (reviews.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		className: "marble-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Customer Reviews",
			title: "Loved by homeowners & businesses"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
			children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-luxe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-0.5 text-[var(--gold)]",
						children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-foreground/85 leading-relaxed",
						children: [
							"\"",
							r.review_text,
							"\""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 pt-4 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-[var(--burgundy)]",
							children: r.customer_name
						}), r.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: r.location
						}) : null]
					})
				]
			}, r.id))
		})]
	});
}
function Contact({ settings }) {
	const phone = settings?.phone_primary;
	const phone2 = settings?.phone_secondary;
	const wa = (settings?.whatsapp_number || phone || "").replace(/[^\d+]/g, "").replace(/^\+/, "");
	const hours = Array.isArray(settings?.working_hours) ? settings.working_hours : [];
	const mapsUrl = settings?.google_maps_url;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "contact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Contact",
			title: "Visit our showroom or reach out",
			subtitle: settings?.address_line ?? void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: Phone,
						label: "Phone",
						value: [phone, phone2].filter(Boolean).join(" · ") || "—",
						href: phone ? `tel:${phone}` : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: MessageCircle,
						label: "WhatsApp",
						value: settings?.whatsapp_number ?? phone ?? "—",
						href: wa ? `https://wa.me/${wa}` : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: Mail,
						label: "Email",
						value: settings?.email ?? "—",
						href: settings?.email ? `mailto:${settings.email}` : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: MapPin,
						label: "Address",
						value: settings?.address_line ?? "—",
						href: mapsUrl ?? void 0
					}),
					hours.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl glass-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[var(--burgundy)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display",
								children: "Working Hours"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-1.5 text-sm",
							children: hours.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between border-b border-border/40 py-1 last:border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: h.day
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: h.hours
								})]
							}, i))
						})]
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-3xl border border-border shadow-luxe min-h-[360px]",
				children: mapsUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Google Maps",
					src: mapsUrl.includes("output=embed") ? mapsUrl : `https://www.google.com/maps?q=${encodeURIComponent(settings?.address_line ?? "Botad Gujarat")}&output=embed`,
					className: "h-full w-full min-h-[360px]",
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center bg-muted text-sm text-muted-foreground p-8",
					children: "Map link not set"
				})
			})]
		})]
	});
}
function ContactRow({ icon: Icon, label, value, href }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4 rounded-2xl glass-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl burgundy-gradient text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-medium text-foreground",
			children: value
		})] })]
	});
	return href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: href.startsWith("http") ? "_blank" : void 0,
		rel: "noreferrer noopener",
		children: inner
	}) : inner;
}
function QuoteForm({ settings }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone_number: "",
		product_required: "",
		measurements: "",
		address: "",
		message: ""
	});
	const [file, setFile] = (0, import_react.useState)(null);
	const wa = (settings?.whatsapp_number || settings?.phone_primary || "").replace(/[^\d+]/g, "").replace(/^\+/, "");
	const mutation = useMutation({
		mutationFn: async () => {
			if (!form.name.trim() || !form.phone_number.trim()) throw new Error("Please share your name and phone number.");
			let image_url = null;
			if (file) {
				const path = `inquiries/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
				const { error: upErr } = await supabase.storage.from("mahadev-uploads").upload(path, file, { upsert: false });
				if (upErr) throw upErr;
				image_url = path;
			}
			const { error } = await supabase.from("inquiries").insert({
				name: form.name.trim(),
				phone_number: form.phone_number.trim(),
				product_required: form.product_required || null,
				measurements: form.measurements || null,
				address: form.address || null,
				message: form.message || null,
				image_url,
				source: "quote_form"
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Thank you! We'll get in touch shortly.");
			setForm({
				name: "",
				phone_number: "",
				product_required: "",
				measurements: "",
				address: "",
				message: ""
			});
			setFile(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const waText = encodeURIComponent(`Hello Mahadev Aluminium, I'd like a quote.\nName: ${form.name}\nPhone: ${form.phone_number}\nProduct: ${form.product_required}\nMeasurements: ${form.measurements}\nAddress: ${form.address}\nMessage: ${form.message}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "quote",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Get Quote",
			title: "Tell us about your project",
			subtitle: "Share a few details and we'll prepare a tailored quotation."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				mutation.mutate();
			},
			className: "mx-auto max-w-3xl rounded-3xl glass-card p-6 sm:p-8 grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Your Name *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone Number *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "tel",
						value: form.phone_number,
						onChange: (e) => setForm({
							...form,
							phone_number: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Product Required",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.product_required,
						onChange: (e) => setForm({
							...form,
							product_required: e.target.value
						}),
						placeholder: "e.g. Sliding Door"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Measurements",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.measurements,
						onChange: (e) => setForm({
							...form,
							measurements: e.target.value
						}),
						placeholder: "e.g. 7ft x 4ft"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "sm:col-span-2",
					label: "Address",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.address,
						onChange: (e) => setForm({
							...form,
							address: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "sm:col-span-2",
					label: "Message",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 4,
						value: form.message,
						onChange: (e) => setForm({
							...form,
							message: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "sm:col-span-2",
					label: "Reference Image (optional)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 rounded-xl border border-dashed border-border bg-background/60 px-4 py-3 cursor-pointer hover:border-[var(--gold)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 text-[var(--burgundy)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: file ? file.name : "Click to upload an image"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2 flex flex-wrap gap-3 justify-end",
					children: [wa ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `https://wa.me/${wa}?text=${waText}`,
						target: "_blank",
						rel: "noreferrer noopener",
						className: "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Send on WhatsApp"]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: mutation.isPending,
						className: "rounded-full burgundy-gradient text-white px-6",
						children: mutation.isPending ? "Sending…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 mr-2" }), "Submit Request"] })
					})]
				})
			]
		})]
	});
}
function Field({ label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grid gap-1.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), children]
	});
}
function Footer({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-10 border-t border-border bg-[var(--burgundy)] text-white/85",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						settings,
						className: "h-12 w-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg",
						children: settings?.business_name ?? "Mahadev Aluminium"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]",
						children: settings?.tagline ?? "Section & Door"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-white/70",
					children: settings?.business_description ?? ""
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "font-display text-[var(--gold)] mb-3",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: [
						"Home",
						"About",
						"Services",
						"Gallery",
						"Contact",
						"Get Quote"
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${l.toLowerCase().replace(" ", "-").replace("get-quote", "quote")}`,
						className: "hover:text-[var(--gold)]",
						children: l
					}) }, l))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "font-display text-[var(--gold)] mb-3",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm",
					children: [
						settings?.phone_primary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "hover:text-[var(--gold)]",
							href: `tel:${settings.phone_primary}`,
							children: settings.phone_primary
						}) }),
						settings?.phone_secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "hover:text-[var(--gold)]",
							href: `tel:${settings.phone_secondary}`,
							children: settings.phone_secondary
						}) }),
						settings?.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "hover:text-[var(--gold)]",
							href: `mailto:${settings.email}`,
							children: settings.email
						}) }),
						settings?.address_line && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-white/70",
							children: settings.address_line
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "font-display text-[var(--gold)] mb-3",
						children: "Visit"
					}),
					settings?.google_maps_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: settings.google_maps_url,
						target: "_blank",
						rel: "noreferrer noopener",
						className: "inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), "Get Directions"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-[11px] text-white/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/login",
							className: "hover:text-[var(--gold)]",
							children: "Admin Login"
						})
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					settings?.business_name ?? "Mahadev Aluminium Section & Door",
					". All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-[var(--gold)]" }), "Crafted with precision in Botad, Gujarat"]
				})]
			})
		})]
	});
}
function HomePage() {
	const settingsQ = useQuery({
		queryKey: SITE_QUERY_KEYS.settings,
		queryFn: fetchSiteSettings
	});
	const servicesQ = useQuery({
		queryKey: SITE_QUERY_KEYS.services,
		queryFn: fetchServices
	});
	const catsQ = useQuery({
		queryKey: SITE_QUERY_KEYS.galleryCategories,
		queryFn: fetchGalleryCategories
	});
	const itemsQ = useQuery({
		queryKey: SITE_QUERY_KEYS.galleryItems,
		queryFn: fetchGalleryItems
	});
	const reviewsQ = useQuery({
		queryKey: SITE_QUERY_KEYS.reviews,
		queryFn: fetchReviews
	});
	(0, import_react.useEffect)(() => {
		const key = sessionStorage.getItem("ma_sk") ?? crypto.randomUUID();
		sessionStorage.setItem("ma_sk", key);
		supabase.from("site_visits").insert({
			page_path: window.location.pathname,
			session_key: key,
			referrer: document.referrer || null,
			user_agent: navigator.userAgent.slice(0, 200)
		}).then(() => {});
	}, []);
	const settings = settingsQ.data ?? null;
	const activeServices = (servicesQ.data ?? []).filter((s) => s.is_active);
	const activeCats = (catsQ.data ?? []).filter((c) => c.is_active);
	const activeItems = (itemsQ.data ?? []).filter((i) => i.is_active);
	const visibleReviews = (reviewsQ.data ?? []).filter((r) => r.is_visible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { settings }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, { settings }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChooseUs, { settings }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesGrid, { services: activeServices }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {
					items: activeItems,
					categories: activeCats
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, { settings }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, { reviews: visibleReviews }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, { settings }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteForm, { settings })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingButtons, { settings })
		]
	});
}
//#endregion
export { HomePage as component };
