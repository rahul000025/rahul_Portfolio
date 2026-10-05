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

// Initial seed - real data only
const defaultData: StoreData = {
  messages: [],
  notifications: INITIAL_NOTIFICATIONS,
  activities: INITIAL_ACTIVITIES,
  socials: SOCIAL_INTEGRATIONS,
  analytics: {
    totalVisitors: 0,
    uniqueVisitors: 0,
    projectViews: 0,
    contactRequests: 0,
    history: []
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

    // Also push a live notification for admin center
    data.notifications.unshift({
      id: `notif-${Date.now()}`,
      source: "Contact Request",
      message: `New message from ${newMsg.name} (${newMsg.reason}): "${newMsg.subject}"`,
      timestamp: "Just now",
      read: false,
      priority: "high",
      actionUrl: "/admin#messages",
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
