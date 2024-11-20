import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Button, Input, Label, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Checkbox, ScrollArea, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Badge } from "../../../components/ui/index";
import { Interview, Question } from '../../../types/types';

type CreateInterviewDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInterview: (interview: Omit<Interview, 'id'>) => void;
};

export default function CreateInterviewDialog({ isOpen, onOpenChange, onCreateInterview }: CreateInterviewDialogProps) {
  const [newInterview, setNewInterview] = useState<Omit<Interview, 'id'>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    reviewer: '',
    questions: [],
    totalDuration: 0,
  });

  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([
    { id: '1', content: 'Describe a challenging project you\'ve worked on.', difficulty: 'Hard', timeLimit: 10, aiGenerated: false, tags: ['Project Management'], creator: 'Admin' },
    { id: '2', content: 'What is your approach to problem-solving?', difficulty: 'Medium', timeLimit: 5, aiGenerated: false, tags: ['Problem Solving'], creator: 'Admin' },
    { id: '3', content: 'Explain the concept of dependency injection.', difficulty: 'Hard', timeLimit: 8, aiGenerated: false, tags: ['Software Engineering'], creator: 'Admin' },
    { id: '4', content: 'How do you ensure code quality in your projects?', difficulty: 'Medium', timeLimit: 7, aiGenerated: false, tags: ['Code Quality'], creator: 'Admin' },
    { id: '5', content: 'What\'s your experience with agile methodologies?', difficulty: 'Easy', timeLimit: 5, aiGenerated: false, tags: ['Agile'], creator: 'Admin' }
  ]);

  const [questionFilter, setQuestionFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  const handleQuestionToggle = (question: Question) => {
    setNewInterview(prev => {
      const isSelected = prev.questions.some(q => q.id === question.id);
      const updatedQuestions = isSelected 
        ? prev.questions.filter(q => q.id !== question.id)
        : [...prev.questions, question];
      
      const updatedDuration = isSelected
        ? prev.totalDuration - question.timeLimit
        : prev.totalDuration + question.timeLimit;

      return { ...prev, questions: updatedQuestions, totalDuration: updatedDuration };
    });
  };

  const filteredQuestions = availableQuestions.filter(question =>
    question.content.toLowerCase().includes(questionFilter.toLowerCase()) &&
    (difficultyFilter === 'All' || question.difficulty === difficultyFilter)
  );

  const generateAIQuestion = async () => {
    setIsGeneratingQuestion(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      content: "What strategies do you employ to stay updated with the latest technologies in your field?",
      difficulty: "Medium",
      timeLimit: 5,
      aiGenerated: true,
      tags: ['Technology'],
      creator: 'AI'
    };
    setAvailableQuestions([...availableQuestions, newQuestion]);
    setIsGeneratingQuestion(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Interview</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Interview Details</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid gap-4 py-4">
              {['title', 'description', 'reviewer', 'startDate', 'endDate'].map((field) => (
                <div key={field} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    type={field.includes('Date') ? 'date' : 'text'}
                    value={String(newInterview[field as keyof typeof newInterview] || '')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInterview({ ...newInterview, [field]: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="questions">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="ai-support" checked={isAIEnabled} onCheckedChange={setIsAIEnabled} />
                <Label htmlFor="ai-support">AI Support</Label>
              </div>
              {isAIEnabled && (
                <Button onClick={generateAIQuestion} disabled={isGeneratingQuestion}>
                  {isGeneratingQuestion ? 'Generating...' : 'Generate AI Question'}
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Input placeholder="Filter questions..." value={questionFilter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionFilter(e.target.value)} />
              <Select
                value={difficultyFilter}
                onValueChange={(value) => setDifficultyFilter(value as 'All' | 'Easy' | 'Medium' | 'Hard')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {filteredQuestions.map(question => (
                  <div key={question.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`question-${question.id}`}
                      checked={newInterview.questions.some(q => q.id === question.id)}
                      onCheckedChange={() => handleQuestionToggle(question)}
                    />
                    <label htmlFor={`question-${question.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {question.content}
                    </label>
                    <Badge variant={question.difficulty === 'Easy' ? 'secondary' : question.difficulty === 'Medium' ? 'default' : 'destructive'}>
                      {question.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">{question.timeLimit} min</span>
                    {question.aiGenerated && (
                      <Badge variant="outline" className="ml-2">
                        <Sparkles className="w-3 h-3 mr-1" /> AI
                      </Badge>
                    )}
                  </div>
                ))}
              </ScrollArea>
              <div className="flex justify-between items-center">
                <span>Selected Questions: {newInterview.questions.length}</span>
                <span>Total Duration: {newInterview.totalDuration} minutes</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button onClick={() => onCreateInterview(newInterview)}>
            <Plus className="mr-2 h-4 w-4" /> Create Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
