import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../lib/api'
import { saveToken, saveUser } from '../lib/auth'
import AuthLayout from '../components/AuthLayout'
import { Field, PasswordField } from '../components/Field'
import { PrimaryButton, GhostButton, Divider } from '../components/AuthBits'

export default function Register(){
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await register(email.trim(), password, name.trim() || undefined)
      saveToken(res.accessToken)
      saveUser(res.user)
      nav('/dashboard')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Tạo tài khoản mới ✨" subtitle="Bắt đầu học thử 25’ chỉ với vài bước">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Họ và tên" placeholder="Nguyen Van A"
               value={name} onChange={e=>setName((e.target as HTMLInputElement).value)} />
        <Field label="Email" type="email" placeholder="you@example.com" required
               value={email} onChange={e=>setEmail((e.target as HTMLInputElement).value)} />
        <PasswordField label="Mật khẩu" placeholder="Tối thiểu 6 ký tự" required
               value={password} onChange={e=>setPassword((e.target as HTMLInputElement).value)} />
        {error && <div className="text-sm text-rose-300 bg-rose-500/10 border border-rose-400/20 rounded-xl p-3">{error}</div>}
        <PrimaryButton disabled={loading}>{loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}</PrimaryButton>
      </form>

      <Divider text="hoặc" />

      <div className="grid grid-cols-1 gap-2">
        <GhostButton type="button" onClick={()=>alert('Social signup demo')}>
          <span className="inline-flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.18v2.91h5.3a4.54 4.54 0 01-2 2.98l3.23 2.5c1.89-1.74 2.98-4.31 2.98-7.41 0-.5-.05-.98-.13-1.44z"/><path d="M12.17 22c2.7 0 4.97-.9 6.63-2.43l-3.23-2.5c-.9.6-2.05.94-3.4.94-2.6 0-4.8-1.76-5.59-4.12H3.23v2.59A10.01 10.01 0 0012.17 22z"/><path d="M6.58 13.89a5.99 5.99 0 010-3.78V7.52H3.23a10 10 0 000 8.96l3.35-2.59z"/><path d="M12.17 5.8c1.46 0 2.77.5 3.81 1.48l2.86-2.86A9.99 9.99 0 0012.17 2 10 10 0 003.23 7.52l3.35 2.59c.79-2.36 2.99-4.3 5.59-4.3z"/></svg>
            Đăng ký với Google (demo)
          </span>
        </GhostButton>
      </div>

      <p className="mt-5 text-sm text-center text-white/70">
        Đã có tài khoản? <Link to="/login" className="link-muted">Đăng nhập</Link>
      </p>
    </AuthLayout>
  )
}
