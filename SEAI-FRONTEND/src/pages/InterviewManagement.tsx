import { useState, useEffect } from 'react';
import Header from '../components/Header';
import InterviewList from '../components/InterviewList';
import CreateInterviewDialog from '../components/CreateInterviewDialog';
import Chatbot from '../components/Chatbot';
import { Interview } from '../types';
import { Button } from '../components/ui/button';

export default function InterviewManagement() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      title: 'Senior Developer Interview',
      description: 'Interview for the senior developer position',
      startDate: '2023-06-15',
      endDate: '2023-06-20',
      reviewer: 'John Doe',
      questions: [
        { id: '1', content: 'Describe a challenging project you\'ve worked on.', difficulty: 'Hard', timeLimit: 10, aiGenerated: false, tags: [], creator: '' },
        { id: '2', content: 'What is your approach to problem-solving?', difficulty: 'Medium', timeLimit: 5, aiGenerated: false, tags: [], creator: '' },
      ],
      totalDuration: 15,
    },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCreateInterview = (newInterview: Omit<Interview, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setInterviews([...interviews, { ...newInterview, id }]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteInterview = (id: string) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 text-gray-800">
      <Header isScrolled={isScrolled} />
      <main className="relative px-4 pb-24 pt-32 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Interview Management</h1>
            <Button variant="default" onClick={() => setIsCreateModalOpen(true)}>
              Create New Interview
            </Button>
          </div>
          <InterviewList
            interviews={interviews}
            onDeleteInterview={handleDeleteInterview}
          />
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateInterviewDialog
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onCreateInterview={handleCreateInterview}
        />
      )}

      <Chatbot /> {/* Adds Chatbot to Interview Management */}
    </div>
  );
}
