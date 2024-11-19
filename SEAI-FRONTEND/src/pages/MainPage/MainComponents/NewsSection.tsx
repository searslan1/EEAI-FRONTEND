import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/common/card"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { ChevronRight } from 'lucide-react'

export default function NewsSection() {
  const newsItems = [1, 2, 3, 4, 5]

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-4">Latest News & Advertisements</h2>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        {newsItems.map((item) => (
          <Card key={item} className="mb-4 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Exciting Update {item}</CardTitle>
              <CardDescription>Posted on May {item}, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Read More <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </section>
  )
}
