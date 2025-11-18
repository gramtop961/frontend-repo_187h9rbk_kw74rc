import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AIImport from './components/AIImport'
import { QuickLogin, SimpleBrowser } from './components/Sections'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <Hero />
      <QuickLogin />
      <SimpleBrowser />
      <AIImport />
      <footer className="mt-20 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        Built for modern cooks • Light/Dark mode supported
      </footer>
    </div>
  )
}

export default App
