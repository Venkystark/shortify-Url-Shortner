import { useState } from 'react';
import { Search, User, TrendingUp, Users, MousePointerClick, Link2 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Input } from './ui/input';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Analytics({ onNavigate, onLogout }: AnalyticsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for charts
  const clicksOverTime = [
    { date: 'Nov 7', clicks: 245 },
    { date: 'Nov 8', clicks: 412 },
    { date: 'Nov 9', clicks: 387 },
    { date: 'Nov 10', clicks: 523 },
    { date: 'Nov 11', clicks: 698 },
    { date: 'Nov 12', clicks: 854 },
    { date: 'Nov 13', clicks: 1024 },
  ];

  const trafficByCountry = [
    { name: 'USA', value: 4200 },
    { name: 'UK', value: 2100 },
    { name: 'Canada', value: 1500 },
    { name: 'Germany', value: 1200 },
    { name: 'Others', value: 2000 },
  ];

  const deviceDistribution = [
    { device: 'Desktop', count: 5200 },
    { device: 'Mobile', count: 4100 },
    { device: 'Tablet', count: 1700 },
  ];

  const COLORS = ['#7C3AED', '#3B82F6', '#06B6D4', '#FACC15', '#FB7185'];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentPage="analytics" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search analytics..."
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
          <div className="mb-8">
            <h1 className="text-gray-900 text-3xl mb-2">Analytics Dashboard 📊</h1>
            <p className="text-gray-600">Comprehensive insights into your link performance.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg shadow-purple-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/90">Total Clicks</p>
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-5xl mb-2">11,000</p>
                <p className="text-white/80 text-sm">↑ 23% from last week</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-lg shadow-blue-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/90">Unique Visitors</p>
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-5xl mb-2">8,542</p>
                <p className="text-white/80 text-sm">↑ 18% from last week</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg shadow-emerald-500/30 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/90">Most Popular Link</p>
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Link2 className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-5xl mb-2">3,421</p>
                <p className="text-white/80 text-sm">shortify.app/sum25</p>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Clicks Over Time */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 text-xl mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-violet-600" />
                Clicks Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clicksOverTime}>
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
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Traffic by Country */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 text-xl mb-6">Traffic by Country</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficByCountry}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficByCountry.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="text-gray-900 text-xl mb-6">Device Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="device" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {deviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-gray-900 mb-4 text-lg">Top Performing Links</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <span className="text-gray-700">shortify.app/sum25</span>
                  <span className="text-violet-600">3,421 clicks</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <span className="text-gray-700">shortify.app/abc123</span>
                  <span className="text-violet-600">1,247 clicks</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <span className="text-gray-700">shortify.app/xyz789</span>
                  <span className="text-violet-600">856 clicks</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="text-gray-900 mb-4 text-lg">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-700 flex-1">New click from USA</span>
                  <span className="text-gray-500 text-sm">2m ago</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700 flex-1">New click from UK</span>
                  <span className="text-gray-500 text-sm">5m ago</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-gray-700 flex-1">New click from Canada</span>
                  <span className="text-gray-500 text-sm">8m ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}