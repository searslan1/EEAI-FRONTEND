import axios from 'axios';
import { Question } from '../types/types';

const BASE_URL = 'http://localhost:5000/api/question';

export interface GetQuestionsResponse {
  message: string;
  questions: Question[];
}

const getAuthToken = () => localStorage.getItem('authToken');

// Fetch questions from the backend
export const getQuestions = async (): Promise<GetQuestionsResponse> => {
  const token = getAuthToken();
  const { data } = await axios.get<GetQuestionsResponse>(`${BASE_URL}/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Create a new question
export const createQuestion = async (newQuestion: Omit<Question, 'id'>): Promise<Question> => {
  const token = getAuthToken();
  const { data } = await axios.post<Question>(`${BASE_URL}/create`, newQuestion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Delete a question
export const deleteQuestion = async (id: string): Promise<void> => {
  const token = getAuthToken();
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
