import React from 'react';
import ReactMarkdown from 'react-markdown';

const TestResults = ({ result }) => {
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-cases.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!result) {
    return (
      <div className="result-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        Generated test cases will appear here...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="controls" style={{ justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
        <button className="btn btn-secondary" onClick={handleCopy} title="Copy to Clipboard">
          Copy
        </button>
        <button className="btn btn-secondary" onClick={handleDownload} title="Download as Markdown">
          Download
        </button>
      </div>
      <div className="result-content">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TestResults;
