import { TrendingRecipes, TrendingIngredients } from '../components/Landing'
import Hero from '../components/Hero'

export default function ExplorePage() {
  return (
    <div>
      <Hero />
      <TrendingRecipes />
      <TrendingIngredients />
    </div>
  )
}
