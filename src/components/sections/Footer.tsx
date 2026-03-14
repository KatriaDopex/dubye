export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-[11px] font-light tracking-wide">
          DUBYE &copy; 2026
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-white/20 text-[11px] font-light tracking-wide hover:text-white/40 transition-colors"
          >
            X / Twitter
          </a>
          <a
            href="#"
            className="text-white/20 text-[11px] font-light tracking-wide hover:text-white/40 transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
