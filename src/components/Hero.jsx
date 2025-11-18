import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60 dark:opacity-40">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-fuchsia-500/30 blur-3xl"></div>
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-indigo-500/30 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Plan meals, discover recipes, and track your nutrition effortlessly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-300"
          >
            A modern cookbook with profiles, meal planning, shopping lists, and an AI helper that drafts recipes from your favorite videos.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#recipes" className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium">Browse Recipes</a>
            <a href="#ai" className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">Try AI Import</a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 shadow-xl p-5">
            <div className="grid grid-cols-3 gap-3 text-sm">
              {['User Login','Recipes','Calorie Tracking','Meal Planning','Shopping List','Ingredients','Products','AI from URL'].map((t) => (
                <div key={t} className="px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-center">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
