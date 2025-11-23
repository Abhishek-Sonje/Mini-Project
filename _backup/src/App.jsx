import React, { useState, useEffect } from 'react';
import CodeInput from './components/CodeInput';
import TestResults from './components/TestResults';
import { generateTestCases } from './services/gemini';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [code, setCode] = useState('');
  const [framework, setFramework] = useState('Jest');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('Please enter your Gemini API Key');
      return;
    }
    if (!code.trim()) {
      alert('Please enter some code');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const generated = await generateTestCases(apiKey, code, framework);
      setResult(generated);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header">
        <h1>AI Test Case Generator</h1>
        <p>Generate high-quality test cases instantly using Gemini</p>
      </div>

      <div className="main-container">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Input Code</div>
          </div>
          
          <div className="controls">
            <div className="input-group">
              <label>Gemini API Key</label>
              <input 
                type="password" 
                placeholder="Enter your API Key" 
                value={apiKey}
                onChange={handleApiKeyChange}
              />
            </div>
            <div className="input-group">
              <label>Testing Framework</label>
              <select value={framework} onChange={(e) => setFramework(e.target.value)}>
                <option value="Jest">Jest (JavaScript)</option>
                <option value="Mocha">Mocha (JavaScript)</option>
                <option value="PyTest">PyTest (Python)</option>
                <option value="Unittest">Unittest (Python)</option>
                <option value="JUnit">JUnit (Java)</option>
              </select>
            </div>
          </div>

          <CodeInput code={code} setCode={setCode} />
          
          <button 
            className="btn btn-primary" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Test Cases'}
          </button>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Generated Test Cases</div>
          </div>
          <TestResults result={result} />
        </div>
      </div>
    </>
  );
}

export default App;
