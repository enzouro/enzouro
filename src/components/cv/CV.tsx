'use client';

import { useState, useRef } from 'react';

interface PDFViewerProps {
  file: string;
  windowWidth: number | null;
}

export default function PDFViewer({ file, windowWidth }: PDFViewerProps) {
  const objectRef = useRef<HTMLObjectElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewerType, setViewerType] = useState<'iframe' | 'object'>('object');

  // Handle errors with object tag and fall back to iframe if needed
  const handleObjectError = () => {
    console.warn('Object tag failed to load PDF, falling back to iframe');
    setViewerType('iframe');
  };

  // Calculate appropriate height based on device
  const getViewerHeight = () => {
    if (!windowWidth) return '80vh';
    
    if (windowWidth < 640) {
      return '70vh'; // Mobile - slightly shorter to fit better
    } else if (windowWidth < 1024) {
      return '75vh'; // Tablet
    } else {
      return '85vh'; // Desktop
    }
  };

  // Add PDF viewing parameters that help with mobile display
  const getPdfViewParams = () => {
    // Parameters to help with mobile viewing
    return '#view=FitH&toolbar=1&navpanes=1';
  };

  if (viewerType === 'object') {
    return (
      <div className="border border-gray-800 rounded-md bg-white bg-opacity-5 overflow-hidden">
        <object
          ref={objectRef}
          data={`${file}${getPdfViewParams()}`}
          type="application/pdf"
          className="w-full"
          style={{ height: getViewerHeight() }}
          onError={handleObjectError}
        >
          <iframe
            src={`${file}${getPdfViewParams()}`}
            className="w-full"
            style={{ height: getViewerHeight() }}
            title="PDF Document"
          />
        </object>
      </div>
    );
  }
  
  return (
    <div className="border border-gray-800 rounded-md bg-white bg-opacity-5 overflow-hidden">
      <iframe
        ref={iframeRef}
        src={`${file}${getPdfViewParams()}`}
        className="w-full"
        style={{ height: getViewerHeight() }}
        title="PDF Document"
      />
    </div>
  );
}
