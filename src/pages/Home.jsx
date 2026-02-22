import Hero from '../components/Hero'
import TickerBanner from '../components/TickerBanner'
import ProblemSection from '../components/ProblemSection'
import EntryPoints from '../components/EntryPoints'
import FeaturesSection from '../components/FeaturesSection'
import StatsSection from '../components/StatsSection'
import FounderSection from '../components/FounderSection'
import CTABanner from '../components/CTABanner'

export default function Home() {
  return (
    <main>
      <Hero />
      <TickerBanner />
      <ProblemSection />
      <EntryPoints />
      <FeaturesSection />
      <StatsSection />
      <FounderSection />
      <CTABanner />
    </main>
  )
}
