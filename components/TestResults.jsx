"use client";

import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { Copy, Check } from "lucide-react";

const TestResults = ({ result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result) return null;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-accent text-white px-4 py-2 rounded-t-lg text-sm font-medium flex justify-between items-center">
        <span>Generated Tests</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 hover:text-primary transition-colors text-xs uppercase tracking-wider"
        >
          {copied ? (
            <>
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy Code
            </>
          )}
        </button>
      </div>
      <div className="border-2 border-accent rounded-b-lg overflow-hidden bg-[#2d2d2d] shadow-lg">
        <Editor
          value={result}
          onValueChange={() => {}}
          highlight={(code) => highlight(code, languages.js)}
          padding={20}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "#2d2d2d",
            color: "#f8f8f2",
          }}
          readOnly
        />
      </div>
    </div>
  );
};

export default TestResults;
