'use client';

import React, { useState } from 'react';
import { FaSpinner, FaShare, FaClipboard } from 'react-icons/fa';

const QuoteGenerator: React.FC = () =>
{
  const [movieName, setMovieName] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [generatedQuote, setGeneratedQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>('');

  const generateQuote = async () =>
  {
    // Validate inputs
    if (!movieName.trim() || !topic.trim()) {
      setInputError('Movie Name and Topic cannot be empty');
      return;
    } else {
      setInputError('');
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieName, topic }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedQuote(data.generatedQuote);
      } else {
        console.error('Error Generating Quote:', response.statusText);
      }
    } catch (error) {
      console.error('Error Generating Quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () =>
  {
    navigator.share({
      title: 'Movie Quote Generator',
      text: `I generated ${generatedQuote} using Movie Quote Generator`,
      url: process.env.NEXT_PUBLIC_SITE_URL,
    });
  };

  const handleCopyToClipboard = () =>
  {
    navigator.clipboard.writeText(generatedQuote);
    setIsCopied(true);

    setTimeout(() =>
    {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter the Movie Name"
        className={`w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 ${inputError && 'border-red-500'
          }`}
      />
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a Topic"
        className={`w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 ${inputError && 'border-red-500'
          }`}
      />
      {inputError && (
        <p className="text-red-500 text-sm mb-2">{inputError}</p>
      )}
      <button
        onClick={generateQuote}
        className="w-full p-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin mr-2 inline-block" />
        ) : (
          'Generate Quote'
        )}
      </button>
      {generatedQuote && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleShare}
            className="p-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <FaShare />
          </button>
          <button
            onClick={handleCopyToClipboard}
            className={`p-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          >
            {isCopied ? 'Copied!' : <FaClipboard />}
          </button>
        </div>
      )}
      {generatedQuote && (
        <p className={`quote mt-4 ${generatedQuote && 'text-green-500'}`}>
          {generatedQuote}
        </p>
      )}
    </div>
  );
};

export default QuoteGenerator;
