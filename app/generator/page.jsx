"use client";

import React, { useState } from "react";
import CodeInput from "../../components/CodeInput";
import TestResults from "../../components/TestResults";
import { ArrowLeft, Sparkles, Code2, Terminal } from "lucide-react";
import Link from "next/link";

export default function Generator() {
  const [code, setCode] = useState("");
  const [framework, setFramework] = useState("Jest");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim()) {
      alert("Please enter some code");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, framework }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate tests");
      }

      setResult(data.result);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-accent">
              System Online
            </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Controls */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-orange-100">
              <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-primary" />
                Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Testing Framework
                  </label>

                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="Jest">Jest (JavaScript)</option>
                    <option value="Mocha">Mocha (JavaScript)</option>
                    <option value="PyTest">PyTest (Python)</option>
                    <option value="Unittest">Unittest (Python)</option>
                    <option value="JUnit">JUnit (Java)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Our AI analyzes your code structure and logic to generate
                    comprehensive test coverage automatically.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 px-6 bg-accent text-white rounded-xl font-bold text-lg shadow-lg hover:bg-primary hover:shadow-orange-200/50 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Tests
                </>
              )}
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white p-1 rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
              <CodeInput code={code} setCode={setCode} />
            </div>

            {result && (
              <div className="bg-white p-1 rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
                <TestResults result={result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
