
import { Plus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

type QuestionFiltersProps = {
  filter: string;
  setFilter: (value: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
  allTags: string[];
  setIsCreateModalOpen: (value: boolean) => void;
};

export default function QuestionFilters({
  filter,
  setFilter,
  difficultyFilter,
  setDifficultyFilter,
  tagFilter,
  setTagFilter,
  allTags,
  setIsCreateModalOpen,
}: QuestionFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
      <Input
        placeholder="Filter questions..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="flex-1 min-w-[200px]"
      />
      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Difficulties</SelectItem>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      <Select value={tagFilter} onValueChange={setTagFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Tags</SelectItem>
          {allTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={() => setIsCreateModalOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Create Question
      </Button>
    </div>
  );
}
