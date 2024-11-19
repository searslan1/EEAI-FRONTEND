import { Button } from "../../../components/common/button"; // Button'u buradan import ediyoruz
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/common/card";
import { Star, Users, Briefcase, TrendingUp } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type HeroSectionProps = {
  hrData: {
    dailyAverageRating: number;
    totalInterviews: number;
    openPositions: number;
    interviewEfficiency: number;
  };
  dailyApplications: Array<{ day: string; applications: number }>;
};

export default function HeroSection({ hrData, dailyApplications }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[80vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/10 via-blue-300/30 to-blue-400/50"></div>
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Featured Interview"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <h1 className="text-3xl font-bold md:text-5xl lg:text-7xl text-white drop-shadow-lg">
              Exclusive Interview: Tech Visionary
            </h1>
            <p className="mt-4 max-w-xs text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl text-white drop-shadow">
              Dive deep into the mind of a leading tech innovator as they share insights on the future of technology and business.
            </p>
            <div className="mt-6 flex space-x-3">
              <Button variant="outline" size="lg">
                Watch Now
              </Button>
              <Button variant="default" size="lg">
                More Info
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>HR Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Daily Avg Rating</p>
                      <p className="font-semibold">{hrData.dailyAverageRating}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Total Interviews</p>
                      <p className="font-semibold">{hrData.totalInterviews}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Open Positions</p>
                      <p className="font-semibold">{hrData.openPositions}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Interview Efficiency</p>
                      <p className="font-semibold">{hrData.interviewEfficiency}%</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2">Daily Applications</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={dailyApplications}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="applications" stroke="#4F46E5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
