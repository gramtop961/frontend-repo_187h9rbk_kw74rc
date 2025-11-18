import { useEffect, useState } from 'react'
import { Sun, Moon, UtensilsCrossed } from 'lucide-react'

export default function Navbar() {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'system'
    setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme === 'dark' || (theme === 'system' && systemDark)
    root.classList.toggle('dark', isDark)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-fuchsia-500 grid place-items-center shadow-md">
            <UtensilsCrossed className="text-white" size={18} />
          </div>
          <div>
            <div className="text-slate-900 dark:text-white font-semibold leading-tight">Modern Cookbook</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Plan • Cook • Track</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeButton current={theme} onChange={setTheme} />
        </div>
      </div>
    </header>
  )
}

function ThemeButton({ current, onChange }) {
  const cycle = () => {
    const order = ['system', 'light', 'dark']
    const next = order[(order.indexOf(current) + 1) % order.length]
    onChange(next)
  }

  const iconMap = {
    system: <Sun size={18} className="text-amber-500" />,
    light: <Sun size={18} className="text-amber-500" />,
    dark: <Moon size={18} className="text-indigo-400" />,
  }

  return (
    <button
      onClick={cycle}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      title={`Theme: ${current}`}
    >
      {iconMap[current]}
      <span className="text-sm capitalize hidden sm:inline">{current}</span>
    </button>
  )
}
