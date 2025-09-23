import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar, TrendingUp, Globe, MousePointer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAuth } from "./AuthContext";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function Analytics() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [analyticsData, setAnalyticsData] = useState({
    dailyClicks: [] as { date: string; clicks: number }[],
    topUrls: [] as { name: string; clicks: number }[],
    totalClicks: 0,
    avgClicksPerUrl: 0
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

    // Generate analytics data
    if (parsedUrls.length > 0) {
      // Daily clicks for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toDateString();
      }).reverse();

      const dailyClicks = last7Days.map(dateStr => {
        const clicksForDay = parsedUrls
          .filter((url: ShortenedUrl) => url.createdAt.toDateString() === dateStr)
          .reduce((sum: number, url: ShortenedUrl) => sum + url.clicks, 0);
        
        return {
          date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          clicks: clicksForDay
        };
      });

      // Top 5 URLs by clicks
      const topUrls = parsedUrls
        .sort((a: ShortenedUrl, b: ShortenedUrl) => b.clicks - a.clicks)
        .slice(0, 5)
        .map((url: ShortenedUrl) => ({
          name: url.shortCode,
          clicks: url.clicks
        }));

      const totalClicks = parsedUrls.reduce((sum: number, url: ShortenedUrl) => sum + url.clicks, 0);
      const avgClicksPerUrl = parsedUrls.length > 0 ? Math.round(totalClicks / parsedUrls.length) : 0;

      setAnalyticsData({
        dailyClicks,
        topUrls,
        totalClicks,
        avgClicksPerUrl
      });
    }
  }, []);

  if (urls.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl">No Analytics Data</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create some short URLs and get clicks to see detailed analytics and insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl">Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your URL performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total URLs</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{urls.length}</div>
            <p className="text-xs text-muted-foreground">Active links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analyticsData.totalClicks}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg. Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analyticsData.avgClicksPerUrl}</div>
            <p className="text-xs text-muted-foreground">Per URL</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {analyticsData.dailyClicks.reduce((sum, day) => sum + day.clicks, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total clicks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Clicks Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Clicks (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.dailyClicks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top URLs Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.topUrls}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="clicks"
                  >
                    {analyticsData.topUrls.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* URL Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>URL Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urls
              .sort((a, b) => b.clicks - a.clicks)
              .map((url, index) => (
                <div key={url.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-muted px-2 py-1 rounded">#{index + 1}</span>
                      <code className="text-sm">{url.shortCode}</code>
                    </div>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {url.originalUrl}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg">{url.clicks}</div>
                    <div className="text-xs text-muted-foreground">clicks</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}