/**
 * RazzShares Web3 — Supabase Client
 * 
 * Replace the placeholders below with your actual Supabase project credentials.
 * Get them from: https://app.supabase.com → Project Settings → API
 */

// ── Config ──
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_KEY  = 'YOUR_ANON_KEY';

/**
 * Initialize Supabase client.
 * Include the Supabase CDN script before this file:
 * <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
 */
let supabase = null;
if (typeof window !== 'undefined' && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// ── Auth helpers ──
const Auth = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// ── Newsletter helpers ──
const Newsletter = {
  async subscribe(email) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString(), status: 'active' }]);
    if (error) throw error;
    return data;
  },
  async getSubscribers() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async unsubscribe(email) {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ status: 'inactive' })
      .eq('email', email);
    if (error) throw error;
  }
};

// ── Projects helpers ──
const Projects = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async create(project) {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ ...project, created_at: new Date().toISOString() }]);
    if (error) throw error;
    return data;
  },
  async update(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
    return data;
  },
  async delete(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// ── Content helpers ──
const Content = {
  async getPosts(type = null) {
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (type) query = query.eq('type', type);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  async createPost(post) {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ ...post, created_at: new Date().toISOString() }]);
    if (error) throw error;
    return data;
  }
};

// ── Analytics helpers ──
const Analytics = {
  async trackPageView(page) {
    await supabase.from('page_views').insert([{
      page,
      visited_at: new Date().toISOString(),
      user_agent: navigator.userAgent
    }]);
  },
  async getStats() {
    const { data, error } = await supabase
      .from('analytics_summary')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  }
};

// ── Supabase DB Schema (run in Supabase SQL editor) ──
/*
-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  category TEXT,
  chain TEXT,
  description TEXT,
  url TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'active',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts / Content
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT DEFAULT 'blog',
  status TEXT DEFAULT 'draft',
  author TEXT,
  views INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page views
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT,
  user_agent TEXT,
  visited_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read for projects and posts
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (status = 'active');
CREATE POLICY "Public read posts" ON posts FOR SELECT USING (status = 'published');

-- Allow authenticated write
CREATE POLICY "Admin write projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

-- Allow anyone to subscribe to newsletter
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
*/

export { supabase, Auth, Newsletter, Projects, Content, Analytics };
