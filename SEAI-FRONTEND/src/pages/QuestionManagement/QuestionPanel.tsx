'use client';

import { useState, useEffect } from 'react';
import Header from '../../layouts/Header';
import QuestionFilters from './QuestionComponents/QuestionFilters';
import QuestionList from './QuestionComponents/QuestionList';
import CreateQuestionDialog from './QuestionComponents/CreateQuestionDialog';
import Chatbot from '../../layouts/Chatbot';
import { Question } from '../../types/types';
import { getQuestions, createQuestion, deleteQuestion } from '../../services/questionService';

export default function QuestionPanel() {
  const [isScrolled, setIsScrolled] = useState(false); // Scroll state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [tagFilter, setTagFilter] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch questions from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getQuestions();
        const transformedQuestions = response.questions.map((q) => ({
          ...q,
          content: q.questionText, // Map `questionText` to `content` for frontend use
        }));
        setQuestions(transformedQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to fetch questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle creating a new question
  const handleCreateQuestion = async (newQuestion: Omit<Question, 'id'>) => {
    try {
      const createdQuestion = await createQuestion(newQuestion);
      setQuestions([...questions, createdQuestion]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Error creating question:', err);
      setError('Failed to create question. Please try again.');
    }
  };

  // Handle deleting a question
  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Failed to delete question. Please try again.');
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter((question) =>
    question.content.toLowerCase().includes(filter.toLowerCase()) &&
    (difficultyFilter === 'All' || question.difficulty === difficultyFilter) &&
    (tagFilter === 'All' || question.tags.includes(tagFilter))
  );

  // Collect all tags for filters
  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags)));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 text-gray-800">
      <Header isScrolled={isScrolled} />
      <main className="relative px-4 pb-24 pt-32 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Question Panel</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading ? (
            <div className="text-center">Loading questions...</div>
          ) : (
            <>
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
            </>
          )}
          <CreateQuestionDialog
            isOpen={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
            onCreateQuestion={handleCreateQuestion}
          />
        </div>
      </main>
      <Chatbot />
    </div>
  );
}
