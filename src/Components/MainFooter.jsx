import React from 'react';
import { FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="py-6 mb-8 w-full">
      <div className="w-full mx-auto px-4">       
        <div className="flex justify-center flex-wrap space-x-4">
          <a href="https://github.com" className="text-gray-600 hover:text-gray-500">
            <FaGithub className="text-2xl" />
          </a>
          <p className="text-sm text-gray-600">&copy; 2024 GitHub, Inc.</p>
          <a href="/terms" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Terms</a>
          <a href="/privacy" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Privacy</a>
          <a href="/security" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Security</a>
          <a href="/status" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Status</a>
          <a href="/docs" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Docs</a>
          <a href="/contact" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Contact</a>
          <a href="/cookies" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Manage cookies</a>
          <a href="/personal-info" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Do not share my personal information</a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
