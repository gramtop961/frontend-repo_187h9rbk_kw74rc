import Hero from '../components/Hero'
import { QuickLogin } from '../components/Sections'
import { TrendingRecipes, TrendingIngredients, RecommendationsOrCTA } from '../components/Landing'

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <section id="get-started">
        <QuickLogin />
      </section>
      <TrendingRecipes />
      <TrendingIngredients />
      <RecommendationsOrCTA />
    </div>
  )
}
