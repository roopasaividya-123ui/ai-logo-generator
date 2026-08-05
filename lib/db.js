/**
 * SaaS Persistent Database Engine
 * Supports client-side persistent storage with server sync fallbacks.
 */

const STORAGE_KEYS = {
  USER: "ai_logo_saas_user",
  LOGOS: "ai_logo_saas_logos",
  CREDITS: "ai_logo_saas_credits",
};

// Initial default user for seamless out-of-the-box testing
const DEFAULT_USER = {
  id: "usr_demo_123",
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  plan: "Free Tier",
  credits: 10,
  createdAt: new Date().toISOString(),
};

// Sample initial logos so gallery and dashboard are populated out of the box
const INITIAL_LOGOS = [
  {
    id: "logo_sample_1",
    userId: "usr_demo_123",
    title: "Aura Coffee",
    desc: "Organic artisan coffee roasting company with warm minimalist vibes",
    palette: "Sunset Warmth",
    colors: ["#ff6f61", "#ff8566", "#ff9f6b"],
    designStyle: "Minimalist & Elegant",
    idea: "Abstract minimalist coffee bean with subtle rising steam lines",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    svgContent: null,
    isFavorite: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "logo_sample_2",
    userId: "usr_demo_123",
    title: "Apex Nexus Tech",
    desc: "Cloud native developer tools and high performance computing platform",
    palette: "Ocean Blues",
    colors: ["#003f5c", "#2f4b7c", "#665191"],
    designStyle: "App Logo",
    idea: "Futuristic 3D connected network node forming a capital letter A",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    svgContent: null,
    isFavorite: false,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const dbEngine = {
  getUser: () => {
    if (typeof window === "undefined") return DEFAULT_USER;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
        return DEFAULT_USER;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_USER;
    }
  },

  setUser: (userData) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  getCredits: () => {
    const user = dbEngine.getUser();
    return user?.credits ?? 10;
  },

  deductCredit: () => {
    const user = dbEngine.getUser();
    if (user.credits <= 0) return false;
    const updated = { ...user, credits: user.credits - 1 };
    dbEngine.setUser(updated);
    return true;
  },

  addCredits: (amount) => {
    const user = dbEngine.getUser();
    const updated = { ...user, credits: (user.credits || 0) + amount };
    dbEngine.setUser(updated);
    return updated.credits;
  },

  getLogos: () => {
    if (typeof window === "undefined") return INITIAL_LOGOS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOGOS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.LOGOS, JSON.stringify(INITIAL_LOGOS));
        return INITIAL_LOGOS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_LOGOS;
    }
  },

  saveLogo: (logoData) => {
    const current = dbEngine.getLogos();
    const newLogo = {
      id: `logo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: dbEngine.getUser()?.id || "usr_demo_123",
      isFavorite: false,
      createdAt: new Date().toISOString(),
      ...logoData,
    };
    const updated = [newLogo, ...current];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.LOGOS, JSON.stringify(updated));
    }
    return newLogo;
  },

  deleteLogo: (id) => {
    const current = dbEngine.getLogos();
    const updated = current.filter((item) => item.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.LOGOS, JSON.stringify(updated));
    }
    return updated;
  },

  toggleFavorite: (id) => {
    const current = dbEngine.getLogos();
    const updated = current.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.LOGOS, JSON.stringify(updated));
    }
    return updated;
  },
};
