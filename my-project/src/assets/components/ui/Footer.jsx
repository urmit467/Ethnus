import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-600">
      <p>&copy; {new Date().getFullYear()} Event Manager Inc.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#newsletter" className="hover:underline">Newsletter</a>
        <a href="#contact" className="hover:underline">Contact Us</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
      </div>
    </footer>
  )
}