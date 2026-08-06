export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-amber-900 px-6">
      {/* Google Fonts: cursive display + refined serif support */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        @keyframes draw-swash {
          from { stroke-dashoffset: 480; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-14px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .swash-path, .fade-up { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; }
          .spark { animation: none !important; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(201,164,106,0.10), transparent 60%)',
        }}
      />

      <span className="spark absolute left-[22%] top-[30%] h-1 w-1 rounded-full bg-[#C9A46A]" style={{ animation: 'drift 6s ease-in-out infinite' }} />
      <span className="spark absolute right-[26%] top-[62%] h-[3px] w-[3px] rounded-full bg-[#E8D5C4]" style={{ animation: 'drift 7.5s ease-in-out infinite 1s' }} />
      <span className="spark absolute left-[34%] bottom-[24%] h-1 w-1 rounded-full bg-[#C9A46A]/80" style={{ animation: 'drift 5.2s ease-in-out infinite 0.5s' }} />
      <span className="spark absolute right-[20%] top-[22%] h-[2px] w-[2px] rounded-full bg-[#E8D5C4]" style={{ animation: 'drift 8s ease-in-out infinite 2s' }} />

      <div className="relative flex flex-col items-center text-center">
        <span
          className="fade-up text-[11px] uppercase tracking-[0.45em] text-[#C9A46A]/80"
          style={{ fontFamily: "'Cormorant Garamond', serif", animation: 'fade-up 0.8s ease-out both' }}
        >
          Something new is on its way
        </span>

        <h1
          className="mt-6 text-[clamp(3.5rem,10vw,7rem)] leading-none text-[#F3E9DC]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Coming Soon
        </h1>

        <svg width="360" height="40" viewBox="0 0 360 40" fill="none" className="-mt-2" aria-hidden="true">
          <path
            className="swash-path"
            d="M8 20 C 70 4, 130 34, 180 18 S 300 2, 352 22"
            stroke="#C9A46A"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 480,
              strokeDashoffset: 480,
              animation: 'draw-swash 1.8s ease-out 0.3s forwards',
            }}
          />
        </svg>

        <p
          className="fade-up mt-6 max-w-sm text-[15px] italic text-[#E8D5C4]/70"
          style={{ fontFamily: "'Cormorant Garamond', serif", animation: 'fade-up 0.8s ease-out 0.2s both' }}
        >
          We're putting the finishing touches on something worth the wait.
        </p>
      </div>
    </div>
  )
}