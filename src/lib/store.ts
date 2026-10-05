import fs from 'fs';
import path from 'path';
import { ContactMessage, AppNotification, ActivityItem, SocialIntegration } from './types';
import { INITIAL_NOTIFICATIONS, INITIAL_ACTIVITIES, SOCIAL_INTEGRATIONS } from './data';

interface StoreData {
  messages: ContactMessage[];
  notifications: AppNotification[];
  activities: ActivityItem[];
  socials: SocialIntegration[];
  analytics: {
    totalVisitors: number;
    uniqueVisitors: number;
    projectViews: number;
    contactRequests: number;
    history: { date: string; visitors: number; views: number; requests: number }[];
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Initial seed
const defaultData: StoreData = {
  messages: [
    {
      id: "msg-1",
      name: "Alex Thorne",
      email: "alex.thorne@quantumleap.tech",
      subject: "Staff AI Engineer Opportunity",
      reason: "Job Opportunity",
      message: "Hello Rahul, we came across your work on distributed LLM inference pipelines and would love to discuss a Senior/Staff AI Engineer opportunity at our venture-backed AI infrastructure startup.",
      source: "Portfolio Contact Form",
      date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: "New",
      ip: "192.168.1.42",
      archived: false,
    },
    {
      id: "msg-2",
      name: "Priya Sharma",
      email: "priya@scalecloud.io",
      subject: "Consulting: High-Throughput Microservice Architecture",
      reason: "Freelance Project",
      message: "Hi Rahul, we need expert architectural guidance on tuning our FastAPI + MySQL backend to handle over 20,000 requests per minute with sub-50ms latency. Are you available for a consulting engagement?",
      source: "Portfolio Contact Form",
      date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      status: "In Progress",
      ip: "172.56.21.9",
      archived: false,
    },
    {
      id: "msg-3",
      name: "David Chen",
      email: "david@cybermatrix.org",
      subject: "eBPF Zero-Trust Collaboration",
      reason: "Collaboration",
      message: "Rahul, your insights on eBPF-based socket monitoring are incredible. Would love to collaborate on an open-source security tool for Kubernetes workload attestation.",
      source: "Portfolio Contact Form",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: "Replied",
      ip: "104.28.19.2",
      archived: false,
    }
  ],
  notifications: INITIAL_NOTIFICATIONS,
  activities: INITIAL_ACTIVITIES,
  socials: SOCIAL_INTEGRATIONS,
  analytics: {
    totalVisitors: 12480,
    uniqueVisitors: 8940,
    projectViews: 21350,
    contactRequests: 142,
    history: [
      { date: "Oct 01", visitors: 340, views: 620, requests: 4 },
      { date: "Oct 02", visitors: 420, views: 810, requests: 6 },
      { date: "Oct 03", visitors: 510, views: 980, requests: 9 },
      { date: "Oct 04", visitors: 680, views: 1240, requests: 12 },
      { date: "Oct 05", visitors: 820, views: 1530, requests: 15 },
    ]
  }
};

let memoryCache: StoreData | null = null;

function ensureDataFile(): StoreData {
  if (memoryCache) return memoryCache;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      memoryCache = JSON.parse(raw);
      return memoryCache as StoreData;
    } else {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      memoryCache = defaultData;
      return defaultData;
    }
  } catch (err) {
    console.error("Store fallback to memory:", err);
    memoryCache = defaultData;
    return defaultData;
  }
}

function saveData(data: StoreData) {
  memoryCache = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error saving data file:", err);
  }
}

export const Store = {
  getMessages(): ContactMessage[] {
    const data = ensureDataFile();
    return data.messages;
  },

  addMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'status' | 'archived'>): ContactMessage {
    const data = ensureDataFile();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toISOString(),
      status: "New",
      archived: false,
    };
    data.messages.unshift(newMsg);
    data.analytics.contactRequests += 1;

    // Also push a live notification
    data.notifications.unshift({
      id: `notif-${Date.now()}`,
      source: "Contact Request",
      message: `New message from ${newMsg.name} (${newMsg.reason}): "${newMsg.subject}"`,
      timestamp: "Just now",
      read: false,
      priority: "high",
      actionUrl: "/admin#messages",
    });

    // Also push to live activity
    data.activities.unshift({
      id: `act-${Date.now()}`,
      type: "contact_request",
      title: `New contact request from ${newMsg.name}`,
      description: `Inquiry category: ${newMsg.reason} - "${newMsg.subject}"`,
      timestamp: "Just now",
      icon: "Mail",
      source: "Portfolio Contact Form",
    });

    saveData(data);
    return newMsg;
  },

  updateMessageStatus(id: string, status: ContactMessage['status'], archived?: boolean): ContactMessage | null {
    const data = ensureDataFile();
    const idx = data.messages.findIndex(m => m.id === id);
    if (idx === -1) return null;
    data.messages[idx].status = status;
    if (archived !== undefined) {
      data.messages[idx].archived = archived;
    }
    saveData(data);
    return data.messages[idx];
  },

  deleteMessage(id: string): boolean {
    const data = ensureDataFile();
    const initialLen = data.messages.length;
    data.messages = data.messages.filter(m => m.id !== id);
    if (data.messages.length !== initialLen) {
      saveData(data);
      return true;
    }
    return false;
  },

  getNotifications(): AppNotification[] {
    const data = ensureDataFile();
    return data.notifications;
  },

  markNotificationAsRead(id: string): boolean {
    const data = ensureDataFile();
    const notif = data.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      saveData(data);
      return true;
    }
    return false;
  },

  markAllNotificationsAsRead(): void {
    const data = ensureDataFile();
    data.notifications.forEach(n => { n.read = true; });
    saveData(data);
  },

  deleteNotification(id: string): boolean {
    const data = ensureDataFile();
    const initialLen = data.notifications.length;
    data.notifications = data.notifications.filter(n => n.id !== id);
    if (data.notifications.length !== initialLen) {
      saveData(data);
      return true;
    }
    return false;
  },

  getActivities(): ActivityItem[] {
    const data = ensureDataFile();
    return data.activities;
  },

  recordActivity(activity: Omit<ActivityItem, 'id' | 'timestamp'>): ActivityItem {
    const data = ensureDataFile();
    const item: ActivityItem = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: "Just now",
    };
    data.activities.unshift(item);
    if (data.activities.length > 25) {
      data.activities.pop();
    }
    saveData(data);
    return item;
  },

  getSocials(): SocialIntegration[] {
    const data = ensureDataFile();
    return data.socials;
  },

  toggleSocialConnection(id: string): SocialIntegration | null {
    const data = ensureDataFile();
    const item = data.socials.find(s => s.id === id);
    if (!item) return null;
    item.connected = !item.connected;
    item.lastSync = item.connected ? "Just now" : "Disconnected";
    item.status = item.connected ? "active" : "idle";
    saveData(data);
    return item;
  },

  getAnalytics() {
    const data = ensureDataFile();
    return data.analytics;
  },

  incrementVisitorCount(isUnique = false) {
    const data = ensureDataFile();
    data.analytics.totalVisitors += 1;
    if (isUnique) {
      data.analytics.uniqueVisitors += 1;
    }
    saveData(data);
    return data.analytics;
  },

  incrementProjectView() {
    const data = ensureDataFile();
    data.analytics.projectViews += 1;
    saveData(data);
    return data.analytics;
  }
};
