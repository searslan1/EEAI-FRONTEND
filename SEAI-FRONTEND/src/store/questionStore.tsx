// src/store/questionStore.tsx
import { create } from 'zustand';
import { getQuestions, createQuestion, deleteQuestion, updateQuestion } from '../services/questionService';
import { Question } from '../types/types';

interface QuestionStore {
  questions: Question[];
  loading: boolean;
  fetchQuestions: () => Promise<void>;
  addQuestion: (newQuestion: Omit<Question, 'id'>) => Promise<void>;
  removeQuestion: (id: string) => Promise<void>;
  editQuestion: (id: string, updatedData: Partial<Question>) => Promise<void>;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  loading: false,

  fetchQuestions: async () => {
    set({ loading: true });
    const questions = await getQuestions();
    set({ questions, loading: false });
  },

  addQuestion: async (newQuestion) => {
    const question = await createQuestion(newQuestion);
    set({ questions: [...get().questions, question] });
  },

  removeQuestion: async (id) => {
    await deleteQuestion(id);
    set({ questions: get().questions.filter((q) => q.id !== id) });
  },

  editQuestion: async (id, updatedData) => {
    const updatedQuestion = await updateQuestion(id, updatedData);
    set({
      questions: get().questions.map((q) =>
        q.id === id ? { ...q, ...updatedQuestion } : q
      ),
    });
  },
}));
