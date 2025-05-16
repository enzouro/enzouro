'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the PDF viewer component with SSR disabled
const PDFViewer = dynamic(
  () => import('../../components/cv/CV'),
  { ssr: false }
);

export default function CVPage() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  
  // CV file path
  const cvFile = '/John Lorenz Mayo - CV.pdf';

  // Handle window resize to make the component responsive
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle CV download
  function downloadCV() {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">Curriculum Vitae</h1>
          
          {/* Download button */}
          <button 
            onClick={downloadCV} 
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white bg-transparent border border-white rounded-md shadow-inner hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="mr-2">Download CV</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>

        {/* Render PDF viewer component */}
        <PDFViewer 
          file={cvFile} 
          windowWidth={windowWidth} 
        />
      </div>
    </div>
  );
}