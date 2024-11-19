// Header.tsx
import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  isScrolled: boolean;
};

export default function Header({ isScrolled }: HeaderProps) {
  return (
    <header className={`${isScrolled ? 'bg-blue-300/70 backdrop-blur-sm' : ''} fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all lg:px-10 lg:py-6`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img src="/placeholder.svg" alt="InterviewFlix" className="cursor-pointer object-contain" />
        <ul className="hidden space-x-4 md:flex">
          <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
            <Link to="/interview-management">Interviews</Link>
          </li>
          <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
            <Link to="/questions">Questions</Link>
          </li>
          <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <Search className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Admin</p>
        <Bell className="h-6 w-6" />
        <User className="h-6 w-6" />
      </div>
    </header>
  );
}
