import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useAuth() {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth')
      if (raw) setAuth(JSON.parse(raw))
    } catch {}
    const handler = () => {
      try {
        const raw = localStorage.getItem('auth')
        setAuth(raw ? JSON.parse(raw) : null)
      } catch {}
    }
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])
  return auth
}

function Card({ children }) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
      {children}
    </div>
  )
}

function Grid({ children }) {
  return <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
}

function SeedDemo() {
  const [status, setStatus] = useState('idle')
  const [detail, setDetail] = useState('')

  const seed = async () => {
    try {
      setStatus('loading')
      setDetail('')
      const res = await fetch(`${baseUrl}/seed`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to seed')
      setStatus('done')
      setDetail(`Inserted: recipes ${data.inserted?.recipe || 0}, ingredients ${data.inserted?.ingredient || 0}, products ${data.inserted?.product || 0}`)
    } catch (e) {
      setStatus('error')
      setDetail(e.message)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">Load demo content</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">One click to add trending recipes and popular ingredients for browsing.</div>
          {detail && <div className="text-xs mt-1 text-slate-500">{detail}</div>}
        </div>
        <button onClick={seed} disabled={status==='loading'} className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-60">
          {status==='loading' ? 'Seeding…' : 'Seed Demo Data'}
        </button>
      </div>
    </section>
  )
}

export function TrendingRecipes() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/recipes/trending`).then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>{})
  }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Trending recipes</h2>
      <Grid>
        {items.map((r) => (
          <Card key={r.id}>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900 dark:text-white">{r.title}</div>
              <div className="text-xs text-slate-500">🔥 {r.popularity ?? 0}</div>
            </div>
            <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">{r.type || '—'} • {Array.isArray(r.tags) ? r.tags.join(', ') : ''}</div>
            {r.description && <p className="text-sm mt-2 text-slate-700 dark:text-slate-200 line-clamp-2">{r.description}</p>}
          </Card>
        ))}
        {!items.length && <div className="text-sm text-slate-500">No recipes yet. Try seeding demo data below.</div>}
      </Grid>
    </section>
  )
}

export function TrendingIngredients() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${baseUrl}/ingredients/trending`).then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>{})
  }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular ingredients</h2>
      <Grid>
        {items.map((i) => (
          <Card key={i.id}>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900 dark:text-white">{i.name}</div>
              <div className="text-xs text-slate-500">⭐ {i.popularity ?? 0}</div>
            </div>
            <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">{i.unit ? `${i.unit}` : ''}{i.calories_per_unit ? ` • ${i.calories_per_unit} kcal/${i.unit || ''}` : ''}</div>
            {Array.isArray(i.tags) && i.tags.length>0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {i.tags.map((t)=> (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{t}</span>
                ))}
              </div>
            )}
          </Card>
        ))}
        {!items.length && <div className="text-sm text-slate-500">No ingredients yet. Try seeding demo data below.</div>}
      </Grid>
    </section>
  )
}

export function RecommendationsOrCTA() {
  const auth = useAuth()
  const [items, setItems] = useState([])
  useEffect(() => {
    if (auth?.user_id) {
      fetch(`${baseUrl}/recipes/recommended?user_id=${encodeURIComponent(auth.user_id)}`)
        .then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>{})
    } else {
      setItems([])
    }
  }, [auth?.user_id])

  if (!auth?.user_id) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Get personalized picks</h2>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Create a free account to save your preferences and get spot-on recipe recommendations.</p>
          <div className="mt-4 flex gap-3">
            <a href="#get-started" className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium">Create your account</a>
            <a href="#ai" className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">Try AI import first</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Recommended for you</h2>
      <Grid>
        {items.map((r)=> (
          <Card key={r.id}>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900 dark:text-white">{r.title}</div>
              <div className="text-xs text-slate-500">👍 {(r.popularity ?? 0)}</div>
            </div>
            <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">{r.type || '—'} • {Array.isArray(r.tags) ? r.tags.join(', ') : ''}</div>
          </Card>
        ))}
        {!items.length && <div className="text-sm text-slate-500">We need a bit more info to tailor picks. Add likes/dislikes in your profile.</div>}
      </Grid>
    </section>
  )
}

export default function LandingSections() {
  return (
    <>
      <SeedDemo />
      <TrendingRecipes />
      <TrendingIngredients />
      <RecommendationsOrCTA />
    </>
  )
}
