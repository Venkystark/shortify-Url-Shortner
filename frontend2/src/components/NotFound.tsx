import { LinkIcon } from 'lucide-react';
import { Button } from './ui/button';

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

export function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center animate-bounce border border-white/20">
            <LinkIcon className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in">
          404
        </h1>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-white text-4xl mb-4 drop-shadow-lg">
            Link Not Found
          </h2>
          <p className="text-gray-300 text-xl mb-2">
            Oops! This link has gone missing 🔗💔
          </p>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => onNavigate('landing')}
            className="h-14 px-8 rounded-2xl bg-white text-purple-900 hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => onNavigate('dashboard')}
            className="h-14 px-8 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Go to Dashboard
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-8 text-6xl opacity-50">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            🔗
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            💔
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            🔍
          </div>
        </div>
      </div>
    </div>
  );
}