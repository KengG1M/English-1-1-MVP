export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`btn-primary ${props.className || ''}`} />
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`btn-ghost ${props.className || ''}`} />
}

export function Divider({ text = "hoặc" }: { text?: string }) {
  return (
    <div className="flex items-center my-4">
      <div className="h-px bg-white/10 flex-1" />
      <span className="px-3 text-xs text-white/50">{text}</span>
      <div className="h-px bg-white/10 flex-1" />
    </div>
  )
}
