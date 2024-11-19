// /* import { Button } from "../components/ui/button";

// type HeaderProps = {
//   onLoginClick: () => void;
//   onSignUpClick?: () => void; // Opsiyonel bir "Sign Up" tıklama fonksiyonu
// };

// export default function Header({ onLoginClick, onSignUpClick }: HeaderProps) {
//   return (
//     <header className="bg-white/70 backdrop-blur-sm shadow-md fixed top-0 z-50 w-full">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-4">
//           <img
//             src="/placeholder.svg?height=40&width=200"
//             alt="InterviewFlix"
//             className="h-10 w-auto"
//           />
//           <nav className="hidden md:flex space-x-8">
//             <a href="#try" className="text-gray-700 hover:text-blue-600">
//               Try it Now 
//             </a>
//             <a href="#features" className="text-gray-700 hover:text-blue-600">
//               Features
//             </a>
//             <a href="#contact" className="text-gray-700 hover:text-blue-600">
//               Contact
//             </a>
//           </nav>
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" onClick={onLoginClick}>
//             Login
//           </Button>
//           {onSignUpClick && (
//             <Button variant="default" onClick={onSignUpClick}>
//               Sign Up
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
