import { useEffect, useRef } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: unknown, el: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

const LANG_KEY = "mahadev_lang";

function setCookie(value: string) {
  // Google Translate reads the `googtrans` cookie. Format: /<source>/<target>
  const v = `/en/${value}`;
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `googtrans=${v}; expires=${expires}; path=/`;
  // Also set on the apex of the current hostname so it survives a reload.
  const host = window.location.hostname.split(".").slice(-2).join(".");
  if (host) document.cookie = `googtrans=${v}; expires=${expires}; path=/; domain=.${host}`;
}

export function LanguageSwitcher() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const stored = localStorage.getItem(LANG_KEY) || "en";
    if (stored && stored !== "en") setCookie(stored);

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      // eslint-disable-next-line @typescript-eslint/no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,gu,hi",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const onChange = (lang: string) => {
    localStorage.setItem(LANG_KEY, lang);
    setCookie(lang);
    // Trigger Google Translate by simulating a change on its hidden select.
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="relative inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2 py-1.5 backdrop-blur">
      <Globe className="h-3.5 w-3.5 text-[var(--burgundy)]" />
      <select
        aria-label="Select language"
        defaultValue={typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) || "en" : "en"}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs font-medium text-foreground outline-none"
      >
        <option value="en">EN</option>
        <option value="gu">ગુ</option>
        <option value="hi">हि</option>
      </select>
      <div id="google_translate_element" className="absolute -z-10 opacity-0 pointer-events-none" />
    </div>
  );
}
