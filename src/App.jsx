import Navbar from './components/Navbar'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <Outlet />
      <footer className="mt-20 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        Built for modern cooks • Light/Dark mode supported
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/" className="underline">Home</Link>
          <Link to="/explore" className="underline">Explore</Link>
          <Link to="/ai" className="underline">AI Import</Link>
        </div>
      </footer>
    </div>
  )
}
