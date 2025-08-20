import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="max-w-5xl mx-auto px-4 mt-12">
      <div className="rounded-3xl p-10 border">
        <h1 className="text-3xl font-bold">Luyện nói 1‑1 với giáo viên phù hợp. Đặt lịch 60 giây.</h1>
        <p className="text-gray-600 mt-2">Theo giờ Việt Nam · Học thử 25’ · Không ưng, học lại miễn phí.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/teachers" className="px-5 py-3 rounded-xl bg-black text-white text-sm">Tìm giáo viên</Link>
          <Link to="/teachers" className="px-5 py-3 rounded-xl border text-sm">Đặt học thử</Link>
        </div>
      </div>
    </div>
  )
}
