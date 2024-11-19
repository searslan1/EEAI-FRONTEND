import { Calendar, Clock, Edit, Trash2, Sparkles } from 'lucide-react';
import { Button } from "../../../components/common/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/common/card";
import { Interview } from '../../../types/types';

type InterviewCardProps = {
  interview: Interview;
  onDelete: (id: string) => void;
};

export default function InterviewCard({ interview, onDelete }: InterviewCardProps) {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200 p-4">
        <CardTitle className="text-xl font-semibold">{interview.title}</CardTitle>
        <CardDescription className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {interview.startDate} - {interview.endDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-600 mb-4">{interview.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>Reviewer: {interview.reviewer}</span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {interview.totalDuration} min
          </span>
        </div>
        <div className="space-y-1">
          {interview.questions.map((question, index) => (
            <div key={question.id} className="flex items-center justify-between text-sm">
              <span>{index + 1}. {question.content}</span>
              <div className="flex items-center space-x-2">
                <Badge variant={question.difficulty === 'Easy' ? 'secondary' : question.difficulty === 'Medium' ? 'default' : 'destructive'}>
                  {question.difficulty}
                </Badge>
                {question.aiGenerated && (
                  <Badge variant="outline">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex justify-end w-full space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(interview.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
