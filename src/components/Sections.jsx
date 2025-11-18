import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function QuickLogin() {
  const [email, setEmail] = useState('chef@example.com')
  const [password, setPassword] = useState('secret123')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const persist = (data) => {
    try {
      localStorage.setItem('auth', JSON.stringify(data))
      setUser(data)
      window.dispatchEvent(new Event('auth-changed'))
    } catch {}
  }

  const register = async () => {
    setError(null)
    try {
      const res = await fetch(`${baseUrl}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Register failed')
      persist(data)
    } catch (e) {
      setError(e.message)
    }
  }

  const login = async () => {
    setError(null)
    try {
      const res = await fetch(`${baseUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      persist(data)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth')
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Get started</h2>
      <p className="text-slate-600 dark:text-slate-300 mt-1">Create an account to save profiles, plans and recipes.</p>

      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="flex-1 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" placeholder="Email" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="flex-1 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" placeholder="Password" />
        <button onClick={register} className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900">Register</button>
        <button onClick={login} className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">Login</button>
      </div>

      {error && <div className="text-rose-500 text-sm mt-2">{error}</div>}
      {user && <div className="text-emerald-600 dark:text-emerald-400 text-sm mt-2">Welcome {user.email}</div>}
    </section>
  )
}

export function SimpleBrowser() {
  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])
  useEffect(() => {
    const load = async () => {
      const r = await fetch(`${baseUrl}/recipes`).then(r=>r.json()).catch(()=>[])
      const i = await fetch(`${baseUrl}/ingredients`).then(r=>r.json()).catch(()=>[])
      setRecipes(Array.isArray(r) ? r : [])
      setIngredients(Array.isArray(i) ? i : [])
    }
    load()
  }, [])

  return (
    <section id="recipes" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Explore recipes & ingredients</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Recipes</h3>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {recipes.map((r) => (
              <div key={r.id} className="p-3 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                <div className="font-medium">{r.title}</div>
                <div className="text-xs opacity-70">{r.type || '—'} • {r.tags?.join(', ')}</div>
              </div>
            ))}
            {!recipes.length && <div className="text-sm text-slate-500">No recipes yet.</div>}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Ingredients</h3>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {ingredients.map((i) => (
              <div key={i.id} className="p-3 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                <div className="font-medium">{i.name}</div>
                <div className="text-xs opacity-70">{i.unit || ''} {i.calories_per_unit ? `• ${i.calories_per_unit} kcal/${i.unit || ''}` : ''}</div>
              </div>
            ))}
            {!ingredients.length && <div className="text-sm text-slate-500">No ingredients yet.</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
