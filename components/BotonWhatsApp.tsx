import { HREF_WA } from '@/data/sitio';

/**
 * Contacto flotante. Aparece junto con la navegación, después del telón, y
 * acompaña todo el scroll.
 */
export default function BotonWhatsApp() {
  return (
    <aside aria-label="Contacto directo">
      <a
        id="cjWa"
        href={HREF_WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sumarme a Cultura de Jardín por WhatsApp"
        className="fixed bottom-[clamp(16px,2.6vw,32px)] right-[clamp(16px,2.6vw,32px)] z-[92] flex items-center gap-[11px] rounded-full bg-pino py-3.5 pl-4 pr-5 text-papel transition-colors duration-300 hover:bg-borgona"
        style={{ boxShadow: '0 10px 30px rgba(7,19,15,.28)' }}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
          className="flex-none"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.2-8.26 8.2zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.75-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.83.81-.83 1.98s.85 2.3.97 2.46c.12.17 1.67 2.55 4.05 3.58.57.24 1.01.39 1.36.5.57.18 1.09.16 1.5.1.45-.07 1.39-.57 1.59-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.47-.28z" />
        </svg>
        <span className="text-[11px] uppercase tracking-[.17em] whitespace-nowrap">Sumarme</span>
      </a>
    </aside>
  );
}
