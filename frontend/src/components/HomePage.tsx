import { useState } from "react";
import { UrlShortener } from "./UrlShortener";
import { Features } from "./Features";
import { Stats } from "./Stats";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export function HomePage() {
  const [recentUrl, setRecentUrl] = useState<ShortenedUrl | null>(null);

  const handleUrlShortened = (url: ShortenedUrl) => {
    setRecentUrl(url);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <UrlShortener onUrlShortened={handleUrlShortened} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Stats />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Features />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl">Ready to get started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of users who trust Shortify for their URL shortening needs.
          </p>
          <div className="pt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Start Shortening URLs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}