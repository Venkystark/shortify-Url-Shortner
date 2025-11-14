import { useState, useEffect } from 'react';
import { Link2, Copy, ExternalLink, Rocket, TrendingUp, Shield, Check, Zap, Globe, BarChart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { log } from 'console';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      onNavigate('dashboard');
    }
  }, []);


  const shortenLongUrl = async (url: string) => {
    try {
      const backendUrl = (import.meta as any).env?.VITE_BACKEND_URL as string | undefined;

      if (!backendUrl) {
        console.error('BACKEND_URL is not defined');
        throw new Error('BACKEND_URL is not defined');
      }

      const response = await fetch(`${backendUrl}/api/shortenpublic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if(data.status !== "success") {
        throw new Error('Failed to shorten URL');
      }
      let shorturl = `${backendUrl}/${data.shortUrl}`;
      setShortUrl(shorturl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      toast.error('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = () => {
    setIsLoading(true);

    if (!longUrl.trim()) {
      toast.error("Please enter a URL");
      setLongUrl('');
      setIsLoading(false);
      return;
    }

    if (!isValidUrl(longUrl)) {
      toast.error("Please enter a valid URL");
      setLongUrl('');
      setIsLoading(false);
      return;
    }

    shortenLongUrl(longUrl);
    
    // if (longUrl) {
    //   // Mock shortening
    //   const randomId = Math.random().toString(36).substring(2, 8);
    //   setShortUrl(`shortify.app/${randomId}`);
    //   setIsLoading(false);
    // }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-2xl tracking-tight">Shortify</span>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 rounded-xl"
            onClick={() => onNavigate('login')}
          >
            Login
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50 rounded-xl transition-all"
            onClick={() => onNavigate('signup')}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full">
            <span className="text-purple-300 text-sm">✨ The Future of Link Management</span>
          </div>
          <h1 className="text-white text-7xl mb-6 drop-shadow-2xl tracking-tight">
            Shorten. Share. Track.
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Create beautiful short links and track their performance with powerful analytics.
            Perfect for marketers, creators, and businesses.
          </p>
        </div>

        {/* Central Card */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex gap-3 mb-6">
              <Input
                type="url"
                placeholder="Paste your long link here..."
                value={longUrl}
                onChange={(e) => {setLongUrl(e.target.value);}}
                className="flex-1 h-14 px-6 rounded-2xl border-2 border-white/20 bg-white/5 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-white/10 text-lg backdrop-blur-sm"
              />
              <Button
                onClick={handleShorten}
                disabled={isLoading}
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
              {isLoading ? "Shortening..." : "Shorten URL"}
              </Button>
            </div>

            {/* Result Section */}
            {shortUrl && (
              <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-fade-in">
                <p className="text-gray-300 mb-3 text-sm">Your shortened link:</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/5 px-6 py-4 rounded-xl border border-white/10 backdrop-blur-sm">
                    <p className="text-purple-300 text-lg">{shortUrl}</p>
                  </div>
                  <Button
                    onClick={handleCopy}
                    className="h-14 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                  <Button
                    onClick={() => window.open(`${shortUrl}`, '_blank')}
                    className="h-14 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-orange-500/50">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-400">
              Create short links in milliseconds with our optimized infrastructure.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/50">
              <BarChart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-3">Advanced Analytics</h3>
            <p className="text-gray-400">
              Track clicks, locations, devices, and more with real-time dashboards.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-cyan-500/50">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-3">Global Reach</h3>
            <p className="text-gray-400">
              CDN-powered links that load instantly anywhere in the world.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-5">
          <div className="grid md:grid-cols-3 gap-8 bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <div className="text-center">
              <p className="text-5xl text-white mb-2">10M+</p>
              <p className="text-gray-400">Links Created</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-5xl text-white mb-2">99.9%</p>
              <p className="text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-5xl text-white mb-2">150+</p>
              <p className="text-gray-400">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md py-8 mt-15 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Shortify – Empowering smart links.</p>
        </div>
      </footer>
    </div>
  );
}


