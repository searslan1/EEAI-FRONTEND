import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function TechnologiesSection() {
  const technologies = [
    'AI & Machine Learning',
    'Natural Language Processing',
    'Video Analytics',
    'Cloud Infrastructure'
  ]

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-4">Our Technologies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {technologies.map((tech, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg ">{tech}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Leveraging cutting-edge {tech.toLowerCase()} to deliver unparalleled interview experiences.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
