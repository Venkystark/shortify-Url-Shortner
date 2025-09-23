import { useState, useEffect } from "react";
import { Copy, ExternalLink, Trash2, Edit2, BarChart3, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
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

export function Dashboard() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [stats, setStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    clicksToday: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    // Load URLs from localStorage (user-specific)
    const storageKey = user ? `shortifiedUrls_${user.id}` : 'shortifiedUrls_guest';
    const savedUrls = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const parsedUrls = savedUrls.map((url: any) => ({
      ...url,
      createdAt: new Date(url.createdAt)
    }));
    setUrls(parsedUrls);

    // Calculate stats
    const totalClicks = parsedUrls.reduce((sum: number, url: ShortenedUrl) => sum + url.clicks, 0);
    const today = new Date().toDateString();
    const clicksToday = parsedUrls
      .filter((url: ShortenedUrl) => url.createdAt.toDateString() === today)
      .reduce((sum: number, url: ShortenedUrl) => sum + url.clicks, 0);

    setStats({
      totalUrls: parsedUrls.length,
      totalClicks,
      clicksToday
    });
  }, []);

  const copyToClipboard = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  const deleteUrl = (id: string) => {
    const updatedUrls = urls.filter(url => url.id !== id);
    setUrls(updatedUrls);
    const storageKey = user ? `shortifiedUrls_${user.id}` : 'shortifiedUrls_guest';
    localStorage.setItem(storageKey, JSON.stringify(updatedUrls));
    toast.success("URL deleted successfully");
  };

  const simulateClick = (id: string) => {
    const updatedUrls = urls.map(url => 
      url.id === id ? { ...url, clicks: url.clicks + 1 } : url
    );
    setUrls(updatedUrls);
    const storageKey = user ? `shortifiedUrls_${user.id}` : 'shortifiedUrls_guest';
    localStorage.setItem(storageKey, JSON.stringify(updatedUrls));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      clicksToday: prev.clicksToday + 1
    }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (urls.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl">No URLs Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start shortening URLs to see your dashboard with analytics and link management.
          </p>
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Create Your First Short URL
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">Manage and track your shortened URLs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total URLs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalUrls}</div>
            <p className="text-xs text-muted-foreground">Active short links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Clicks</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalClicks}</div>
            <p className="text-xs text-muted-foreground">All time clicks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Today's Clicks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.clicksToday}</div>
            <p className="text-xs text-muted-foreground">Clicks today</p>
          </CardContent>
        </Card>
      </div>

      {/* URLs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Short URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Short URL</TableHead>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {urls.map((url) => (
                  <TableRow key={url.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {url.shortCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(url.shortUrl)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={url.originalUrl}>
                        {url.originalUrl}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="cursor-pointer" onClick={() => simulateClick(url.id)}>
                        {url.clicks}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(url.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(url.originalUrl, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteUrl(url.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}