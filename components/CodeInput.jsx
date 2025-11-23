"use client";

import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme for code

const CodeInput = ({ code, setCode }) => {
  return (
    <div className="w-full mb-6">
      <div className="bg-accent text-white px-4 py-2 rounded-t-lg text-sm font-medium flex justify-between items-center">
        <span>Source Code</span>
        <span className="text-xs text-gray-400">Paste your code below</span>
      </div>
      <div className="border-2 border-accent rounded-b-lg overflow-hidden bg-[#2d2d2d] min-h-[300px] shadow-lg">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={20}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "#2d2d2d",
            color: "#f8f8f2",
            minHeight: "300px",
          }}
          className="min-h-[300px]"
        />
      </div>
    </div>
  );
};

export default CodeInput;
