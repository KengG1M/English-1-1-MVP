import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center m-[100px]">
      <div className="bg-noise" />
      <div className="absolute inset-0 -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="max-w-md w-full px-4">
        <div className="glass rounded-3xl p-8">
          <div className="mb-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 justify-center">
              <div className="size-9 rounded-2xl bg-indigo-500/80 flex items-center justify-center shadow-md shadow-indigo-500/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 7h8M6 12h12M8 17h8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
              <span className="text-white font-semibold tracking-wide">English 1‑1</span>
            </Link>
            <h1 className="mt-5 text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="mt-2 text-white/70 text-sm">{subtitle}</p>}
          </div>
          {children}
        </div>

        <p className="text-center text-xs text-white/50 mt-5">
          Bằng cách tiếp tục, bạn đồng ý với <a href="#" className="link-muted">Điều khoản</a> & <a href="#" className="link-muted">Chính sách</a>.
        </p>
      </div>
    </div>
  )
}
