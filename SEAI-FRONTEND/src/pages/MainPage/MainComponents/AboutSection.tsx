import { Check } from 'lucide-react'

export default function AboutSection() {
  const features = [
    'AI-powered interviews',
    'Customizable question banks',
    'Real-time analytics',
    'Seamless integration'
  ]

  return (
    <section className="grid md:grid-cols-2 gap-8 mb-16">
      <div>
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-gray-600 mb-4">
          InterviewFlix is a cutting-edge platform that combines artificial intelligence with human expertise to streamline and enhance the interview process. Our mission is to help companies find the best talent and assist candidates in showcasing their skills effectively.
        </p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/placeholder.svg?height=300&width=500"
          alt="InterviewFlix Platform"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
