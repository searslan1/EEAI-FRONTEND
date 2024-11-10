import { Interview } from '../types';
import InterviewCard from './InterviewCard';

type InterviewListProps = {
  interviews: Interview[];
  onDeleteInterview: (id: string) => void;
};

export default function InterviewList({ interviews, onDeleteInterview }: InterviewListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onDelete={onDeleteInterview}
        />
      ))}
    </div>
  );
}
