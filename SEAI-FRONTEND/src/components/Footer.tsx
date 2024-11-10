import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-blue-300/70 backdrop-blur-sm text-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">InterviewFlix</h3>
            <p className="text-sm">Empowering careers through insightful interviews.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Contact</Link></li>
              <li><Link to="#" className="hover:underline">FAQ</Link></li>
              <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-800 hover:text-gray-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="..." clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-800 hover:text-gray-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="..." />
                </svg>
              </Link>
              <Link to="#" className="text-gray-800 hover:text-gray-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="..." clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 bg-white text-gray-800 rounded-l-md focus:outline-none"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} InterviewFlix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
