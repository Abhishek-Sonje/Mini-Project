import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, Code } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold text-accent flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Code size={20} />
          </div>
          TestGen<span className="text-primary">.ai</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </div>
        <Link 
          href="/generator" 
          className="px-6 py-2.5 bg-accent text-white rounded-full font-medium hover:bg-primary transition-colors shadow-lg hover:shadow-orange-200/50"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-primary font-semibold text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              v2.0 is now live
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-accent leading-tight">
              Write Tests <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                10x Faster
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Stop writing boilerplate. Let our advanced AI analyze your code and generate comprehensive unit tests in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/generator" 
                className="px-8 py-4 bg-accent text-white rounded-xl font-bold text-lg hover:bg-primary transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2"
              >
                Start Generating <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 bg-white text-accent border-2 border-gray-100 rounded-xl font-bold text-lg hover:border-primary hover:text-primary transition-colors">
                View Demo
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 font-medium pt-4">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> Free tier available
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-orange-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#1e1e1e] rounded-xl p-6 overflow-hidden">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-gray-400">// Input: Your function</div>
                  <div className="text-blue-400">function <span className="text-yellow-300">add</span>(a, b) {'{'}</div>
                  <div className="text-white pl-4">return a + b;</div>
                  <div className="text-blue-400">{'}'}</div>
                  <div className="h-4"></div>
                  <div className="text-gray-400">// Output: Generated Test</div>
                  <div className="text-purple-400">test(<span className="text-green-300">'adds 1 + 2 to equal 3'</span>, () ={'>'} {'{'}</div>
                  <div className="text-white pl-4">expect(add(1, 2)).toBe(3);</div>
                  <div className="text-purple-400">{'}'});</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-accent mb-4">Why Choose TestGen.ai?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We combine cutting-edge AI with developer-focused tools to streamline your testing workflow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} />,
                title: "Lightning Fast",
                desc: "Generate hundreds of lines of test code in seconds, not hours."
              },
              {
                icon: <Shield size={32} />,
                title: "Secure & Private",
                desc: "Your code is processed securely and never stored on our servers."
              },
              {
                icon: <Code size={32} />,
                title: "Multi-Language",
                desc: "Support for JavaScript, Python, Java, and more popular languages."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-accent mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-accent mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
