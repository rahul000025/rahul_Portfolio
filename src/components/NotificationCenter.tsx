'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCheck, Trash2, Filter, X, ExternalLink, Mail, Github, Share2, Sparkles, MessageSquare } from 'lucide-react';
import { AppNotification } from '@/lib/types';

interface NotificationCenterProps {
  onOpenAdmin?: () => void;
}

export default function NotificationCenter({ onOpenAdmin }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/notifications?id=${id}`, { method: 'DELETE' });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getSourceIcon = (source: AppNotification['source']) => {
    switch (source) {
      case 'Contact Request':
      case 'Message':
        return <Mail className="w-4 h-4 text-cyan-400" />;
      case 'GitHub Activity':
        return <Github className="w-4 h-4 text-violet-400" />;
      case 'Social Integration Event':
        return <Share2 className="w-4 h-4 text-indigo-400" />;
      case 'Project Inquiry':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Newsletter Signup':
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    if (activeFilter === 'Contact') return n.source === 'Contact Request' || n.source === 'Message' || n.source === 'Project Inquiry';
    if (activeFilter === 'GitHub') return n.source === 'GitHub Activity';
    if (activeFilter === 'Social') return n.source === 'Social Integration Event';
    return true;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Unified Notification Center"
        className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-1 text-[11px] font-bold text-white shadow-lg animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl z-50 overflow-hidden border border-slate-700/60 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white tracking-wide">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  title="Mark all as read"
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center space-x-1 transition-colors p-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 px-3 py-2 border-b border-slate-800/60 bg-slate-900/40 overflow-x-auto text-xs no-scrollbar">
            {['All', 'Unread', 'Contact', 'GitHub', 'Social'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1 rounded-lg transition-all text-xs font-medium whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-800/50">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center px-4">
                <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                <p className="text-sm text-slate-400 font-medium">No notifications found</p>
                <p className="text-xs text-slate-500 mt-1">You're all caught up with your updates.</p>
              </div>
            ) : (
              filteredNotifications.map(item => (
                <div
                  key={item.id}
                  className={`p-3.5 flex items-start space-x-3 transition-colors hover:bg-slate-800/40 ${
                    !item.read ? 'bg-indigo-950/20' : ''
                  }`}
                >
                  <div className="mt-0.5 p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    {getSourceIcon(item.source)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-indigo-400 tracking-wider uppercase">
                        {item.source}
                      </span>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-normal mb-1.5">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      {!item.read ? (
                        <button
                          onClick={(e) => handleMarkAsRead(item.id, e)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>Mark read</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500">Read</span>
                      )}

                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        title="Delete notification"
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with link to Admin */}
          <div className="p-2.5 border-t border-slate-800/80 bg-slate-950/70 text-center">
            <a
              href="/admin"
              className="text-xs text-slate-400 hover:text-indigo-300 font-medium inline-flex items-center space-x-1.5 py-1 px-3 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <span>Open Admin Dashboard & Settings</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
