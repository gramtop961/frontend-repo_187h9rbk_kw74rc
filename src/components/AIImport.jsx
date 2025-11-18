import { useState } from 'react'

export default function AIImport() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const run = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/ai/parse-recipe?url=${encodeURIComponent(url)}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">AI: Create recipe from a URL</h2>
      <p className="text-slate-600 dark:text-slate-300 mt-1">Paste a TikTok, YouTube or blog URL. We'll try to extract a starting point for a recipe.</p>

      <form onSubmit={run} className="mt-6 flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="flex-1 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-60"
        >
          {loading ? 'Parsing...' : 'Generate'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-sm text-rose-500">{error}</div>
      )}

      {result && (
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Title</h3>
            <p className="text-slate-700 dark:text-slate-200">{result.title || 'Untitled'}</p>

            <h3 className="font-semibold mt-4 text-slate-900 dark:text-white">Ingredients</h3>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-200 space-y-1">
              {result.ingredients?.length ? result.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              )) : <li>No ingredients found</li>}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Steps</h3>
            <ol className="list-decimal pl-5 text-slate-700 dark:text-slate-200 space-y-1">
              {result.steps?.length ? result.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              )) : <li>No steps found</li>}
            </ol>
            {result.notes && <p className="mt-3 text-xs text-slate-500">{result.notes}</p>}
          </div>
        </div>
      )}
    </section>
  )
}
