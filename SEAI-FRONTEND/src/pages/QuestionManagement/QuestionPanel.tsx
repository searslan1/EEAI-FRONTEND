'use client';

import { useState, useEffect } from 'react';
import Header from '../../layouts/Header';
import QuestionFilters from './QuestionComponents/QuestionFilters';
import QuestionList from './QuestionComponents/QuestionList';
import CreateQuestionDialog from './QuestionComponents/CreateQuestionDialog';
import Chatbot from '../../layouts/Chatbot';
import { Question } from '../../types/types';

export default function QuestionPanel() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', content: 'What is your approach to problem-solving?', difficulty: 'Medium', tags: ['Problem Solving', 'Soft Skills'], creator: 'John Doe', timeLimit: 5, aiGenerated: false },
    { id: '2', content: 'Describe a challenging project you\'ve worked on.', difficulty: 'Hard', tags: ['Experience', 'Project Management'], creator: 'Jane Smith', timeLimit: 10, aiGenerated: true },
  ]);
  const [filter, setFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [tagFilter, setTagFilter] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCreateQuestion = (newQuestion: Omit<Question, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setQuestions([...questions, { ...newQuestion, id }]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const filteredQuestions = questions.filter((question) =>
    question.content.toLowerCase().includes(filter.toLowerCase()) &&
    (difficultyFilter === 'All' || question.difficulty === difficultyFilter) &&
    (tagFilter === 'All' || question.tags.includes(tagFilter))
  );

  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags)));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 text-gray-800">
      <Header isScrolled={isScrolled} />
      <main className="relative px-4 pb-24 pt-32 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Question Panel</h1>
          <QuestionFilters
            filter={filter}
            setFilter={setFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            tagFilter={tagFilter}
            setTagFilter={setTagFilter}
            allTags={allTags}
            setIsCreateModalOpen={setIsCreateModalOpen}
          />
          <QuestionList
            questions={filteredQuestions}
            onDeleteQuestion={handleDeleteQuestion}
          />
          <CreateQuestionDialog
            isOpen={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
            onCreateQuestion={handleCreateQuestion}
          />
        </div>
      </main>
      <Chatbot /> {/* Adds Chatbot to Question Panel */}
    </div>
  );
}
