import { Clock, Trash2, Sparkles } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/common/card";
import { Badge } from "../../../components/ui/badge";
import { Question } from '../../../types/types';

type QuestionListProps = {
  questions: Question[];
  onDeleteQuestion: (id: string) => void;
};

export default function QuestionList({ questions, onDeleteQuestion }: QuestionListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {questions.map((question) => (
        <Card key={question.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200 p-4">
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              <span>Question</span>
              <Badge variant={question.difficulty === 'Easy' ? 'secondary' : question.difficulty === 'Medium' ? 'default' : 'destructive'}>
                {question.difficulty}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-600 mb-4">{question.content}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {question.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{question.timeLimit} minutes</span>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-200 p-4">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-gray-500">
                Created by: {question.creator}
                {question.aiGenerated && (
                  <Badge variant="outline" className="ml-2">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Generated
                  </Badge>
                )}
              </span>
              <Button variant="destructive" size="sm" onClick={() => onDeleteQuestion(question.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
