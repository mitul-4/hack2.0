'use client';

import { useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import dynamic from 'next/dynamic';

// Dynamically import webcam component to avoid SSR issues
const Webcam = dynamic(() => import('react-webcam'), { ssr: false });

interface ScannerProps {
  onIngredientsFound: (ingredients: { name: string; quantity: string; unit: string }[]) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onIngredientsFound }) => {
  const [mode, setMode] = useState<'receipt' | 'barcode' | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setError(null);
      const response = await fetch('/api/receipt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process receipt');
      }

      const data = await response.json();
      if (data.ingredients) {
        onIngredientsFound(data.ingredients);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process receipt');
    }
  };

  const startBarcodeScanning = async () => {
    setIsScanning(true);
    setError(null);
  
    try {
      const codeReader = new BrowserMultiFormatReader();
  
      if (webcamRef.current) {
        codeReader.decodeFromVideoElement(webcamRef.current.video, (result) => {
          if (result) {
            setIsScanning(false);
  
            // Send barcode to API
            fetch('/api/barcode', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ barcode: result.getText() }),
            })
              .then((response) => {
                if (!response.ok) throw new Error('Failed to lookup product');
                return response.json();
              })
              .then((data) => {
                if (data.ingredients) {
                  onIngredientsFound(data.ingredients);
                }
              })
              .catch((err) => setError(err.message));
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan barcode');
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Scan Items</h2>
      
      {!mode ? (
        <div className="space-y-4">
          <button
            onClick={() => setMode('receipt')}
            className="w-full py-2 px-4 bg-[#00a36c] text-white rounded-full hover:bg-[#007f4c]"
          >
            Scan Receipt
          </button>
          <button
            onClick={() => setMode('barcode')}
            className="w-full py-2 px-4 bg-[#00a36c] text-white rounded-full hover:bg-[#007f4c]"
          >
            Scan Barcode
          </button>
        </div>
      ) : mode === 'receipt' ? (
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 px-4 bg-[#00a36c] text-white rounded-full hover:bg-[#007f4c]"
          >
            Upload Receipt
          </button>
          <button
            onClick={() => setMode(null)}
            className="w-full py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {isScanning ? (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 border-2 border-[#00a36c] rounded-lg" />
            </div>
          ) : (
            <button
              onClick={startBarcodeScanning}
              className="w-full py-2 px-4 bg-[#00a36c] text-white rounded-full hover:bg-[#007f4c]"
            >
              Start Scanning
            </button>
          )}
          <button
            onClick={() => {
              setMode(null);
              setIsScanning(false);
            }}
            className="w-full py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Scanner; 