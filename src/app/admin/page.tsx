'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, KeyRound, LogOut, LayoutDashboard, Mail, Bell, FolderGit2, 
  BarChart3, Share2, User, Settings, CheckCircle2, Clock, Trash2, 
  Archive, RefreshCw, ExternalLink, ShieldCheck, ChevronRight, Filter,
  Users, Eye, Activity, Send, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { ContactMessage, AppNotification, ActivityItem, SocialIntegration } from '@/lib/types';
import { PROJECTS, PERSONAL_INFO } from '@/lib/data';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'notifications' | 'projects' | 'analytics' | 'socials' | 'profile' | 'settings'>('dashboard');

  // Admin Telemetry State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [socials, setSocials] = useState<SocialIntegration[]>([]);
  const [analytics, setAnalytics] = useState<any>({
    totalVisitors: 12480,
    uniqueVisitors: 8940,
    projectViews: 21350,
    contactRequests: 142,
    history: []
  });

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageFilter, setMessageFilter] = useState<string>('All');
  const [notificationFilter, setNotificationFilter] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check existing session
  useEffect(() => {
    const sessionToken = localStorage.getItem('rahul_admin_session');
    if (sessionToken) {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('rahul_admin_session', data.token);
        setIsAuthenticated(true);
        fetchAdminData();
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Connection error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rahul_admin_session');
    setIsAuthenticated(false);
  };

  const fetchAdminData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setMessages(json.data.messages || []);
          setNotifications(json.data.notifications || []);
          setActivities(json.data.activities || []);
          setSocials(json.data.socials || []);
          setAnalytics(json.data.analytics || {});
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSocial = async (id: string) => {
    try {
      const res = await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'toggle' }),
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // If not logged in, render authentication modal/view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1 mb-6">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Admin Control Center
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Rahul Thakur Engineering Workspace
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase block">
                Access Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter admin password (Default: rahul2026)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-400"
                />
                <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            >
              Authenticate & Unlock Vault
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              ← Return to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter messages
  const filteredMessages = messages.filter(m => {
    if (messageFilter === 'All') return true;
    return m.status === messageFilter;
  });

  return (
    <div className="min-h-screen bg-dark-950 text-slate-200 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="border-b border-slate-800/90 bg-dark-950/80 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-dark-950 rounded-[11px] flex items-center justify-center font-mono font-bold text-xs text-white">
              RT
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Admin Dashboard</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PROD
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">Rahul Thakur • Lead Engineer</p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={fetchAdminData}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center space-x-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-cyan-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900/40"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800/80 bg-slate-950/40 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'messages', label: 'Messages', icon: Mail, count: messages.filter(m => m.status === 'New').length },
            { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter(n => !n.read).length },
            { id: 'projects', label: 'Projects', icon: FolderGit2 },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'socials', label: 'Social Integrations', icon: Share2 },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-dark-950">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                    <span>TOTAL VISITORS</span>
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {analytics.totalVisitors?.toLocaleString() || '12,480'}
                  </div>
                  <p className="text-[11px] text-emerald-400 mt-1 font-mono">+18.4% this week</p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                    <span>UNIQUE VISITORS</span>
                    <Activity className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {analytics.uniqueVisitors?.toLocaleString() || '8,940'}
                  </div>
                  <p className="text-[11px] text-emerald-400 mt-1 font-mono">+12.1% this week</p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                    <span>CONTACT REQUESTS</span>
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {messages.length}
                  </div>
                  <p className="text-[11px] text-cyan-400 mt-1 font-mono">
                    {messages.filter(m => m.status === 'New').length} pending review
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                    <span>PROJECT VIEWS</span>
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {analytics.projectViews?.toLocaleString() || '21,350'}
                  </div>
                  <p className="text-[11px] text-purple-400 mt-1 font-mono">High engagement</p>
                </div>
              </div>

              {/* Chart Visualization: Visitors & Requests over Time */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Traffic & Engagement Telemetry</h3>
                    <p className="text-xs text-slate-400 font-mono">Daily Visitors vs. Project Views (Last 5 Days)</p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                    Live Engine
                  </span>
                </div>

                <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-800/80 pb-2">
                  {[
                    { day: "Oct 01", visitors: 340, views: 620 },
                    { day: "Oct 02", visitors: 420, views: 810 },
                    { day: "Oct 03", visitors: 510, views: 980 },
                    { day: "Oct 04", visitors: 680, views: 1240 },
                    { day: "Oct 05", visitors: 820, views: 1530 },
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1.5 h-36">
                        <div
                          style={{ height: `${(bar.visitors / 900) * 100}%` }}
                          className="w-1/2 bg-indigo-500 rounded-t-md hover:bg-indigo-400 transition-all relative group"
                          title={`Visitors: ${bar.visitors}`}
                        />
                        <div
                          style={{ height: `${(bar.views / 1600) * 100}%` }}
                          className="w-1/2 bg-cyan-400 rounded-t-md hover:bg-cyan-300 transition-all relative group"
                          title={`Views: ${bar.views}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-6 text-xs font-mono text-slate-400 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-indigo-500 inline-block" />
                    <span>Unique Visitors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-cyan-400 inline-block" />
                    <span>Project Interactions</span>
                  </div>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Recent Incoming Contact Requests</h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    View All ({messages.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-800">
                  {messages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-white">{msg.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            {msg.reason}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{msg.subject}</p>
                      </div>

                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        msg.status === 'New' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MESSAGES & CONTACT REQUEST MANAGEMENT */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Contact Requests & Inquiries</h2>
                  <p className="text-xs text-slate-400">Manage incoming lead communications, responses, and archival.</p>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                  {['All', 'New', 'In Progress', 'Replied', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setMessageFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium ${
                        messageFilter === st
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Table */}
              <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                      <tr>
                        <th className="p-4">Sender</th>
                        <th className="p-4">Reason</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredMessages.map((msg) => (
                        <tr
                          key={msg.id}
                          className="hover:bg-slate-900/40 cursor-pointer transition-colors"
                          onClick={() => setSelectedMessage(msg)}
                        >
                          <td className="p-4">
                            <div className="font-semibold text-white">{msg.name}</div>
                            <div className="text-slate-400 font-mono text-[11px]">{msg.email}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">
                              {msg.reason}
                            </span>
                          </td>
                          <td className="p-4 max-w-xs truncate text-slate-300">
                            {msg.subject}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                              msg.status === 'New' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' :
                              msg.status === 'In Progress' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                              msg.status === 'Replied' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                              'bg-slate-900 text-slate-400'
                            }`}>
                              {msg.status}
                            </span>
                          </td>
                          <td className="p-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-2">
                              <a
                                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white"
                                title="Reply via Email"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => deleteMessage(msg.id)}
                                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400"
                                title="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Message Details Drawer/Modal */}
              {selectedMessage && (
                <div className="glass-panel rounded-3xl p-6 border border-slate-700 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">Inquiry Details</h3>
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value as any)}
                        className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Replied">Replied</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="text-xs text-slate-400 hover:text-white px-2 py-1"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 font-mono">FROM:</span>
                      <p className="font-semibold text-white">{selectedMessage.name} ({selectedMessage.email})</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono">REASON:</span>
                      <p className="font-semibold text-indigo-400">{selectedMessage.reason}</p>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="text-slate-500 font-mono">SUBJECT:</span>
                    <p className="font-semibold text-white">{selectedMessage.subject}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                    {selectedMessage.message}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Compose Direct Reply</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">System & Integration Notifications</h2>
                  <p className="text-xs text-slate-400">All alerts across web forms, GitHub triggers, and social streams.</p>
                </div>
              </div>

              <div className="glass-panel rounded-2xl border border-slate-800 divide-y divide-slate-800/60">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[11px] font-mono text-indigo-400 uppercase">{n.source}</span>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200">{n.message}</p>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      n.read ? 'bg-slate-900 text-slate-500' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {n.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">Project Showcase Catalog</h2>
                <p className="text-xs text-slate-400">Active portfolio entries and featured deployments.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-cyan-400">{p.category}</span>
                        <span className="text-[10px] font-mono text-emerald-400">Production</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{p.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/60 mt-3 text-xs">
                      <a href={p.liveUrl} target="_blank" className="text-cyan-400 hover:underline flex items-center space-x-1">
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href={p.githubUrl} target="_blank" className="text-slate-400 hover:text-white flex items-center space-x-1">
                        <span>Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">Privacy-Conscious Analytics</h2>
                <p className="text-xs text-slate-400">Real-time visitor trends, geographical breakdown, and conversion rates.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                  <h4 className="text-xs font-mono text-slate-400 mb-2">TRAFFIC SOURCES</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between"><span>Direct / Portfolio URL</span><span className="font-mono text-cyan-400">48%</span></li>
                    <li className="flex justify-between"><span>GitHub Repositories</span><span className="font-mono text-cyan-400">26%</span></li>
                    <li className="flex justify-between"><span>LinkedIn Referrals</span><span className="font-mono text-cyan-400">18%</span></li>
                    <li className="flex justify-between"><span>Search / Social</span><span className="font-mono text-cyan-400">8%</span></li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                  <h4 className="text-xs font-mono text-slate-400 mb-2">TOP GEOGRAPHIES</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between"><span>India</span><span className="font-mono text-indigo-400">52%</span></li>
                    <li className="flex justify-between"><span>United States</span><span className="font-mono text-indigo-400">24%</span></li>
                    <li className="flex justify-between"><span>United Kingdom</span><span className="font-mono text-indigo-400">12%</span></li>
                    <li className="flex justify-between"><span>Germany & Singapore</span><span className="font-mono text-indigo-400">12%</span></li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                  <h4 className="text-xs font-mono text-slate-400 mb-2">DEVICE BREAKDOWN</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between"><span>Desktop / Laptop</span><span className="font-mono text-emerald-400">64%</span></li>
                    <li className="flex justify-between"><span>Mobile Devices</span><span className="font-mono text-emerald-400">32%</span></li>
                    <li className="flex justify-between"><span>Tablets</span><span className="font-mono text-emerald-400">4%</span></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SOCIAL INTEGRATIONS */}
          {activeTab === 'socials' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">Social Integrations & API Webhooks</h2>
                <p className="text-xs text-slate-400">Connect developer accounts securely via OAuth and official webhook listeners.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {socials.map((s) => (
                  <div key={s.id} className="p-6 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-bold text-white">{s.name}</h3>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            s.connected ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'
                          }`}>
                            {s.connected ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono text-slate-500">
                          {s.lastSync}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 font-mono mb-3">Handle: {s.username}</p>

                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Available Events:</span>
                        <div className="flex flex-wrap gap-1">
                          {s.availableEvents.map(ev => (
                            <span key={ev} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                              {ev}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <a href={s.url} target="_blank" className="text-xs text-slate-400 hover:text-white flex items-center space-x-1">
                        <span>Open Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => toggleSocial(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                          s.connected
                            ? 'bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30'
                            : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/30'
                        }`}
                      >
                        {s.connected ? 'Disconnect' : 'Connect Account'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white">Owner Profile Configuration</h2>
                <p className="text-xs text-slate-400">Update verified public metadata, contact coordinates, and status.</p>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Display Name</label>
                  <input
                    type="text"
                    defaultValue={PERSONAL_INFO.name}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Professional Title</label>
                  <input
                    type="text"
                    defaultValue={PERSONAL_INFO.title}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Direct Contact Email</label>
                  <input
                    type="email"
                    defaultValue={PERSONAL_INFO.email}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Availability Headline</label>
                  <input
                    type="text"
                    defaultValue={PERSONAL_INFO.status}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <button
                  onClick={() => alert("Profile configurations saved successfully.")}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500"
                >
                  Save Profile Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white">Platform Security & Settings</h2>
                <p className="text-xs text-slate-400">Configure environment security, notification webhooks, and rate limits.</p>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-slate-800">
                  <div>
                    <h4 className="font-semibold text-white">Spam Honeypot & Rate Limiter</h4>
                    <p className="text-slate-400">Protects public contact routes from bot submissions.</p>
                  </div>
                  <span className="text-emerald-400 font-mono">ENABLED</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800">
                  <div>
                    <h4 className="font-semibold text-white">Email Notification Dispatch (Resend / SMTP)</h4>
                    <p className="text-slate-400">Dispatches transactional email alerts when new leads contact.</p>
                  </div>
                  <span className="text-cyan-400 font-mono">CONFIGURED</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-semibold text-white">Admin Passcode Protection</h4>
                    <p className="text-slate-400">Requires verified session for telemetry and message inspection.</p>
                  </div>
                  <span className="text-emerald-400 font-mono">ACTIVE</span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
