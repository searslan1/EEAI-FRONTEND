import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/common/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/common/table";

type NumericKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

type Application = {
  id: string;
  name: string;
  position: string;
  overallScore: number;
  persuasionScore: number;
  confidenceScore: number;
  knowledgeScore: number;
};

type InterviewApplicationsProps = {
  applications: Application[];
};

export default function InterviewApplications({ applications }: InterviewApplicationsProps) {
  const [sortBy, setSortBy] = useState<NumericKeys<Application>>('overallScore');
  const [minScore, setMinScore] = useState(0);

  const filteredAndSortedApplications = applications
    .filter(app => app[sortBy] >= minScore)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <section className="mt-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Interview Applications</span>
            <SlidersHorizontal className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as NumericKeys<Application>)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a criteria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overallScore">Overall Score</SelectItem>
                  <SelectItem value="persuasionScore">Persuasion Score</SelectItem>
                  <SelectItem value="confidenceScore">Confidence Score</SelectItem>
                  <SelectItem value="knowledgeScore">Knowledge Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-2/3">
              <label htmlFor="min-score" className="block text-sm font-medium text-gray-700 mb-1">Minimum Score: {minScore}</label>
              <Slider
                id="min-score"
                min={0}
                max={100}
                step={1}
                value={[minScore]}
                onValueChange={(value) => setMinScore(value[0])}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Persuasion</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Knowledge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.overallScore}</TableCell>
                  <TableCell>{app.persuasionScore}</TableCell>
                  <TableCell>{app.confidenceScore}</TableCell>
                  <TableCell>{app.knowledgeScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
