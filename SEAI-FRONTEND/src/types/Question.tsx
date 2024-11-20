export type Question = {
  id: string;
  questionText: string; // Backend ile aynı isim
  difficulty: string;
  tags: string[];
  creator: string;
  timeLimit: number;
  aiGenerated: boolean;
};
