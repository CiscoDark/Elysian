
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-secondary text-brand-text border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Elysian Talent Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
