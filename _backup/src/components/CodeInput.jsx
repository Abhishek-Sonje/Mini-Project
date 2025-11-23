import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

const CodeInput = ({ code, setCode }) => {
  return (
    <div className="editor-container">
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js || languages.clike)}
        padding={15}
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 14,
          minHeight: '100%',
          backgroundColor: 'transparent',
          color: '#f8fafc',
        }}
        textareaClassName="code-editor-textarea"
        placeholder="// Paste your code here..."
      />
    </div>
  );
};

export default CodeInput;
