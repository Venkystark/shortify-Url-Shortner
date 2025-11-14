import { useState } from 'react';
import { Search, User, Edit, Trash2, BarChart3, PlusCircle, Copy, ExternalLink, Check, TrendingUp, Users, MousePointerClick, Link2, Clock, Globe, Smartphone, Calendar } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface URLItem {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdDate: string;
  status: 'active' | 'inactive';
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [urls, setUrls] = useState<URLItem[]>([
    {
      id: '1',
      originalUrl: 'https://www.example.com/very-long-url-that-needs-to-be-shortened',
      shortUrl: 'shortify.app/abc123',
      clicks: 1247,
      createdDate: 'Nov 10, 2025',
      status: 'active',
    },
    {
      id: '2',
      originalUrl: 'https://www.example.com/another-super-long-url-for-testing',
      shortUrl: 'shortify.app/xyz789',
      clicks: 856,
      createdDate: 'Nov 9, 2025',
      status: 'active',
    },
    {
      id: '3',
      originalUrl: 'https://www.example.com/marketing-campaign-summer-2025',
      shortUrl: 'shortify.app/sum25',
      clicks: 3421,
      createdDate: 'Nov 8, 2025',
      status: 'active',
    },
    {
      id: '4',
      originalUrl: 'https://www.example.com/product-launch-new-feature',
      shortUrl: 'shortify.app/prod01',
      clicks: 542,
      createdDate: 'Nov 7, 2025',
      status: 'active',
    },
  ]);

  const clicksData = [
    { date: 'Mon', clicks: 420 },
    { date: 'Tue', clicks: 580 },
    { date: 'Wed', clicks: 720 },
    { date: 'Thu', clicks: 650 },
    { date: 'Fri', clicks: 890 },
    { date: 'Sat', clicks: 1100 },
    { date: 'Sun', clicks: 980 },
  ];

  const recentActivity = [
    { action: 'New link created', link: 'shortify.app/abc123', time: '2 minutes ago', icon: PlusCircle, color: 'text-emerald-500' },
    { action: '50 new clicks', link: 'shortify.app/sum25', time: '15 minutes ago', icon: MousePointerClick, color: 'text-blue-500' },
    { action: 'Link edited', link: 'shortify.app/xyz789', time: '1 hour ago', icon: Edit, color: 'text-purple-500' },
    { action: 'New visitor from USA', link: 'shortify.app/prod01', time: '2 hours ago', icon: Globe, color: 'text-cyan-500' },
  ];

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(shortUrl);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  const handleCreateNew = () => {
    if (newUrl) {
      const randomId = Math.random().toString(36).substring(2, 8);
      const newItem: URLItem = {
        id: Date.now().toString(),
        originalUrl: newUrl,
        shortUrl: `shortify.app/${randomId}`,
        clicks: 0,
        createdDate: 'Nov 13, 2025',
        status: 'active',
      };
      setUrls([newItem, ...urls]);
      setNewUrl('');
      setIsDialogOpen(false);
    }
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  const filteredUrls = urls.filter(url =>
    url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const avgClicks = Math.round(totalClicks / urls.length);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search URLs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-300 bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <span className="text-sm text-purple-700">Pro Plan</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 cursor-pointer hover:shadow-xl transition-shadow">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-gray-900 text-3xl mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-gray-600">Here's what's happening with your links today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg shadow-purple-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Link2 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+12%</Badge>
                </div>
                <p className="text-white/80 text-sm mb-1">Total Links</p>
                <p className="text-4xl">{urls.length}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-lg shadow-blue-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+23%</Badge>
                </div>
                <p className="text-white/80 text-sm mb-1">Total Clicks</p>
                <p className="text-4xl">{totalClicks.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg shadow-emerald-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+8%</Badge>
                </div>
                <p className="text-white/80 text-sm mb-1">Avg Clicks</p>
                <p className="text-4xl">{avgClicks}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 shadow-lg shadow-orange-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+15%</Badge>
                </div>
                <p className="text-white/80 text-sm mb-1">Unique Visitors</p>
                <p className="text-4xl">2.4K</p>
              </div>
            </div>
          </div>

          {/* Chart and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900 text-xl">Click Analytics</h3>
                  <p className="text-gray-500 text-sm">Last 7 days performance</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg text-xs">Week</Button>
                  <Button variant="ghost" size="sm" className="rounded-lg text-xs">Month</Button>
                  <Button variant="ghost" size="sm" className="rounded-lg text-xs">Year</Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={clicksData}>
                  <defs>
                    <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    fill="url(#clickGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 text-xl mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      activity.color === 'text-emerald-500' ? 'from-emerald-100 to-emerald-200' :
                      activity.color === 'text-blue-500' ? 'from-blue-100 to-blue-200' :
                      activity.color === 'text-purple-500' ? 'from-purple-100 to-purple-200' :
                      'from-cyan-100 to-cyan-200'
                    } flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs truncate">{activity.link}</p>
                      <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-left text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
            >
              <PlusCircle className="w-8 h-8 mb-3" />
              <h4 className="text-lg mb-1">Create New Link</h4>
              <p className="text-white/80 text-sm">Shorten a new URL instantly</p>
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-left text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105"
            >
              <BarChart3 className="w-8 h-8 mb-3" />
              <h4 className="text-lg mb-1">View Analytics</h4>
              <p className="text-white/80 text-sm">Detailed insights & reports</p>
            </button>

            <button className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-left text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:scale-105">
              <Smartphone className="w-8 h-8 mb-3" />
              <h4 className="text-lg mb-1">QR Codes</h4>
              <p className="text-white/80 text-sm">Generate custom QR codes</p>
            </button>
          </div>

          {/* URL List Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 text-xl">Your Short Links</h2>
                <p className="text-gray-500 text-sm">{filteredUrls.length} active links</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Short Link</DialogTitle>
                    <DialogDescription>
                      Enter a long URL to create a shortened version.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <Input
                      type="url"
                      placeholder="https://example.com/very-long-url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                    <Button
                      onClick={handleCreateNew}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl h-12"
                    >
                      Create Link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 text-sm">Original URL</th>
                    <th className="px-6 py-4 text-left text-gray-700 text-sm">Short URL</th>
                    <th className="px-6 py-4 text-left text-gray-700 text-sm">Clicks</th>
                    <th className="px-6 py-4 text-left text-gray-700 text-sm">Status</th>
                    <th className="px-6 py-4 text-left text-gray-700 text-sm">Created</th>
                    <th className="px-6 py-4 text-left text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUrls.map((url) => (
                    <tr key={url.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-gray-700" title={url.originalUrl}>
                          {truncateUrl(url.originalUrl)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://${url.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:text-violet-700"
                          >
                            {url.shortUrl}
                          </a>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(url.shortUrl)}
                            className="h-8 w-8 p-0 rounded-lg hover:bg-violet-100"
                          >
                            {copied === url.shortUrl ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-gray-900">{url.clicks.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-emerald-100 text-emerald-700 border-0 rounded-lg">
                          Active
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{url.createdDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onNavigate('analytics')}
                            className="h-9 px-3 rounded-lg hover:bg-blue-50 text-blue-600"
                            title="View Analytics"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 px-3 rounded-lg hover:bg-yellow-50 text-yellow-600"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(url.id)}
                            className="h-9 px-3 rounded-lg hover:bg-red-50 text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl shadow-purple-500/50 hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <PlusCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
