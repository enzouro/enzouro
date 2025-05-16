'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import pdfjsLib from 'pdfjs-dist'

interface PDFViewerProps {
  file: string;
  windowWidth: number | null;
}

export default function PDFViewer({ file, windowWidth }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Set up PDF worker in an effect rather than at import time
  useEffect(() => {
    async function setupPdfWorker() {
      try {
        // Dynamic import of pdfjs to avoid SSR issues
        
        // Use a fixed version that we know exists
        const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        
        // Set worker source
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
        
        // Test loading the worker
        const testRequest = new Request(pdfWorkerSrc);
        try {
          const response = await fetch(testRequest);
          if (!response.ok) {
            console.warn('PDF worker source exists but returned error status:', response.status);
            setUsingFallback(true);
          }
        } catch (fetchError) {
          console.error('Failed to fetch PDF worker:', fetchError);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error('Error setting up PDF.js worker:', error);
        setUsingFallback(true);
      }
    }
    
    setupPdfWorker();
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Adjust scale based on window width for responsiveness
  useEffect(() => {
    if (windowWidth) {
      if (windowWidth < 640) {
        setScale(0.6); // Mobile
      } else if (windowWidth < 1024) {
        setScale(0.8); // Tablet
      } else {
        setScale(1.0); // Desktop
      }
    }
  }, [windowWidth]);

  // Memoize the options object to prevent unnecessary rerenders
  const documentOptions = useMemo(() => ({
    cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
  }), []);

  // Handle PDF load success
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }

  // Handle PDF load error
  function onDocumentLoadError(error: Error): void {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
    setError(`Failed to load PDF: ${error.message}`);
    setUsingFallback(true);
  }

  // Page navigation functions
  function previousPage(): void {
    setPageNumber(prevPageNumber => 
      prevPageNumber > 1 ? prevPageNumber - 1 : prevPageNumber
    );
  }

  function nextPage(): void {
    setPageNumber(prevPageNumber => 
      prevPageNumber < (numPages || 1) ? prevPageNumber + 1 : prevPageNumber
    );
  }

  // Zoom functions
  function zoomIn(): void {
    setScale(prevScale => Math.min(prevScale + 0.2, 2.5));
  }

  function zoomOut(): void {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  }

  function resetZoom(): void {
    setScale(1.0);
  }

  // Function to handle iframe navigation in fallback mode
  function navigateIframePage(direction: 'prev' | 'next'): void {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        // This will only work if the PDF is from the same origin due to security restrictions
        if (direction === 'prev') {
          iframeRef.current.contentWindow.postMessage({ action: 'previousPage' }, '*');
        } else {
          iframeRef.current.contentWindow.postMessage({ action: 'nextPage' }, '*');
        }
      } catch (error) {
        console.warn('Cannot control iframe PDF directly due to cross-origin restrictions');
      }
    }
  }

  // Fallback viewer using iframe
  if (usingFallback) {
    return (
      <div className="flex flex-col">
        <div className="border border-gray-800 rounded-md overflow-hidden bg-white bg-opacity-5">
          <iframe 
            ref={iframeRef}
            src={`${file}#view=FitH`}
            className="w-full h-[800px]"
            title="PDF Document"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* PDF viewer controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
          <button 
            onClick={previousPage} 
            disabled={pageNumber <= 1}
            className={`p-2 rounded-md ${pageNumber <= 1 ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-700'}`}
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <span>
            Page {pageNumber} of {numPages || '...'}
          </span>
          
          <button 
            onClick={nextPage} 
            disabled={pageNumber >= (numPages ?? 0)}
            className={`p-2 rounded-md ${pageNumber >= (numPages ?? 0) ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-700'}`}
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={zoomOut} 
            className="p-2 rounded-md hover:bg-gray-700"
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
            </svg>
          </button>
          
          <button 
            onClick={resetZoom} 
            className="p-2 rounded-md hover:bg-gray-700"
            aria-label="Reset zoom"
          >
            <span>{Math.round(scale * 100)}%</span>
          </button>
          
          <button 
            onClick={zoomIn} 
            className="p-2 rounded-md hover:bg-gray-700"
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="flex justify-center border border-gray-800 rounded-md bg-white bg-opacity-5 overflow-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-96 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center h-96 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          }
          options={documentOptions}
          error={
            <div className="flex flex-col items-center justify-center h-96 w-full">
              <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <p className="text-center text-red-300">Failed to load the PDF viewer.</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="pdf-page"
            error={
              <div className="flex flex-col items-center justify-center h-96 w-full text-red-300">
                <p>Error loading page {pageNumber}.</p>
              </div>
            }
          />
        </Document>
      </div>
      
      {/* Mobile-friendly pagination */}
      <div className="mt-6 flex justify-center items-center space-x-4 sm:hidden">
        <button 
          onClick={previousPage} 
          disabled={pageNumber <= 1}
          className={`flex items-center px-4 py-2 rounded-md ${pageNumber <= 1 ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Prev
        </button>
        
        <button 
          onClick={nextPage} 
          disabled={pageNumber >= (numPages ?? 0)}
          className={`flex items-center px-4 py-2 rounded-md ${pageNumber >= (numPages ?? 0) ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Next
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}