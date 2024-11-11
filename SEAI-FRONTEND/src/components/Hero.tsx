import { ArrowRight } from 'lucide-react'
import { Button } from "../components/ui/button"

type HeroProps = {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to InterviewFlix</h1>
      <p className="text-xl text-gray-600 mb-8">Revolutionizing the interview process with AI-powered solutions</p>
      <Button size="lg" onClick={onGetStarted}>
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </section>
  )
}
