import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { useAuth } from "./AuthContext";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

interface UrlShortenerProps {
  onUrlShortened?: (url: ShortenedUrl) => void;
}

export function UrlShortener({ onUrlShortened }: UrlShortenerProps) {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const shortCode = generateShortCode();
    const newShortenedUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl: url,
      shortUrl: `https://shortify.io/${shortCode}`,
      shortCode,
      createdAt: new Date(),
      clicks: 0
    };

    // Save to localStorage (user-specific if logged in)
    const storageKey = user ? `shortifiedUrls_${user.id}` : 'shortifiedUrls_guest';
    const existingUrls = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existingUrls.push(newShortenedUrl);
    localStorage.setItem(storageKey, JSON.stringify(existingUrls));

    setShortenedUrl(newShortenedUrl);
    onUrlShortened?.(newShortenedUrl);
    setIsLoading(false);
    toast.success("URL shortened successfully!");
  };

  const copyToClipboard = async () => {
    if (shortenedUrl) {
      await navigator.clipboard.writeText(shortenedUrl.shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewUrl = () => {
    setUrl("");
    setShortenedUrl(null);
    setCopied(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl">Shorten Your URLs</h2>
        <p className="text-muted-foreground text-lg">
          Transform long URLs into short, shareable links in seconds
        </p>
      </div>

      <Card className="p-6">
        <CardContent className="p-0 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="Enter your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleShorten()}
            />
            <Button 
              onClick={handleShorten} 
              disabled={isLoading}
              className="sm:w-auto w-full"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>

          {shortenedUrl && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Shortened URL:</label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono truncate">{shortenedUrl.shortUrl}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(shortenedUrl.originalUrl, '_blank')}
                    className="shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Original: {shortenedUrl.originalUrl.length > 50 ? shortenedUrl.originalUrl.substring(0, 50) + '...' : shortenedUrl.originalUrl}</span>
                <Button variant="outline" size="sm" onClick={handleNewUrl}>
                  Shorten Another
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}