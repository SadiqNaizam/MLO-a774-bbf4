import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Brand/About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">FoodApp</h3>
            <p className="text-sm text-gray-600">
              Your favorite meals, delivered fast. Explore diverse cuisines and enjoy seamless ordering.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange-600">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange-600">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-orange-600">FAQ</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-orange-600">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} FoodApp Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;