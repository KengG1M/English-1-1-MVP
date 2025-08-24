import { useState } from 'react'

export function Field({
  label, type = 'text', placeholder, value, onChange, name, autoComplete, required
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/70">{label}</div>
      <input
        className="input-base"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  )
}

export function PasswordField({
  label, placeholder, value, onChange, name, required
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false)
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/70">{label}</div>
      <div className="relative">
        <input
          className="input-base pr-12"
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          autoComplete="current-password"
        />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-white/80"
          aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.58 10.58a3 3 0 104.24 4.24M9.88 5.05A9.77 9.77 0 0121 12c-1.2 2.5-4.8 6-9 6-1.54 0-2.97-.34-4.22-.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
          )}
        </button>
      </div>
    </label>
  )
}
