import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "../../../components/common/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";
import { Question } from '../../../types/types';

type CreateQuestionDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateQuestion: (question: Omit<Question, 'id'>) => void;
};

export default function CreateQuestionDialog({ isOpen, onOpenChange, onCreateQuestion }: CreateQuestionDialogProps) {
  const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
    content: '',
    difficulty: 'Medium',
    tags: [],
    creator: '',
    timeLimit: 5,
    aiGenerated: false,
  });

  const generateAIQuestion = async () => {
    setNewQuestion({
      content: "What strategies do you employ to stay updated with the latest technologies?",
      difficulty: "Medium",
      tags: ["Professional Development", "Technology"],
      creator: "AI Assistant",
      timeLimit: 5,
      aiGenerated: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-support">AI Support</Label>
            <Switch
              id="ai-support"
              checked={newQuestion.aiGenerated}
              onCheckedChange={(checked) => setNewQuestion({ ...newQuestion, aiGenerated: checked })}
            />
          </div>
          {newQuestion.aiGenerated && (
            <Button onClick={generateAIQuestion}>
              Generate AI Question <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Input
            placeholder="Creator"
            value={newQuestion.creator}
            onChange={(e) => setNewQuestion({ ...newQuestion, creator: e.target.value })}
          />
          <Textarea
            placeholder="Question"
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
          />
          <Select
            value={newQuestion.difficulty}
            onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value as 'Easy' | 'Medium' | 'Hard' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Tags (comma separated)"
            value={newQuestion.tags.join(', ')}  // Value eklendi
            onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          />
          <Input
            type="number"
            placeholder="Time Limit"
            value={newQuestion.timeLimit.toString()}
            onChange={(e) => setNewQuestion({ ...newQuestion, timeLimit: parseInt(e.target.value) })}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onCreateQuestion(newQuestion)}>Create Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
