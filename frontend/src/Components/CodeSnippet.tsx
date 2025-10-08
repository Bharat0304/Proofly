import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface MyCodeComponentProps {
  code: string;
  language?: string;
}

const MyCodeComponent: React.FC<MyCodeComponentProps> = ({ code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-700">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition-all"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          padding: '1rem',
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default MyCodeComponent;
