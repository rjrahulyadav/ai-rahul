/*
  # Create AI Agents Directory Tables

  1. New Tables
    - `categories`: AI agent categories (Text, Image, Code, etc.)
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `icon` (text) - icon name for Lucide React
      - `description` (text)
      - `created_at` (timestamp)
    
    - `ai_agents`: Database of AI assistants
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `category_id` (uuid, foreign key)
      - `url` (text)
      - `logo_url` (text)
      - `features` (text[]) - key features
      - `pricing` (text) - Free, Paid, or Freemium
      - `rating` (numeric) - 0-5 rating
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add public read policies (anyone can browse)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  url text NOT NULL,
  logo_url text,
  features text[] DEFAULT '{}',
  pricing text DEFAULT 'Freemium',
  rating numeric DEFAULT 4.5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "AI agents are publicly readable"
  ON ai_agents FOR SELECT
  TO public
  USING (true);

INSERT INTO categories (name, icon, description) VALUES
  ('Text AI', 'MessageSquare', 'AI assistants for writing and text generation'),
  ('Image AI', 'Image', 'AI tools for image generation and editing'),
  ('Code AI', 'Code', 'AI programming assistants and code generators'),
  ('Search AI', 'Search', 'AI-powered search and research tools'),
  ('Voice AI', 'Mic', 'AI voice and audio processing tools'),
  ('Video AI', 'Video', 'AI video generation and editing tools');

INSERT INTO ai_agents (name, description, category_id, url, logo_url, features, pricing, rating) VALUES
  ('ChatGPT', 'Advanced conversational AI for various tasks', (SELECT id FROM categories WHERE name = 'Text AI'), 'https://chat.openai.com', 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', ARRAY['Conversation', 'Writing', 'Analysis', 'Coding help'], 'Freemium', 4.8),
  ('Claude', 'Intelligent assistant by Anthropic', (SELECT id FROM categories WHERE name = 'Text AI'), 'https://claude.ai', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LLaMA_%28Large_Language_Model_Meta_AI%29_logo.svg/1200px-LLaMA_%28Large_Language_Model_Meta_AI%29_logo.svg.png', ARRAY['Analysis', 'Research', 'Writing', 'Reasoning'], 'Freemium', 4.7),
  ('Google Gemini', 'Google''s next-generation AI model', (SELECT id FROM categories WHERE name = 'Text AI'), 'https://gemini.google.com', 'https://www.gstatic.com/images/branding/product/1x/gemini_2023q4_192dp.png', ARRAY['Search', 'Analysis', 'Creativity', 'Coding'], 'Freemium', 4.6),
  ('Midjourney', 'Powerful AI image generation tool', (SELECT id FROM categories WHERE name = 'Image AI'), 'https://midjourney.com', 'https://cdn.prod.midjourney.com/d0e0ec8b-8ba2-4e4f-87ff-0c1ff6f1c2c3/0_0.png', ARRAY['Image generation', 'Artistic styles', 'Customization', 'Variation'], 'Paid', 4.8),
  ('DALL-E', 'AI image generation by OpenAI', (SELECT id FROM categories WHERE name = 'Image AI'), 'https://openai.com/dall-e', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1200px-OpenAI_Logo.svg.png', ARRAY['Image creation', 'Editing', 'Variations', 'Inpainting'], 'Paid', 4.6),
  ('Stable Diffusion', 'Open-source image generation model', (SELECT id FROM categories WHERE name = 'Image AI'), 'https://stablediffusionweb.com', 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg', ARRAY['Image generation', 'Customizable', 'Open source', 'Local deployment'], 'Free', 4.4),
  ('GitHub Copilot', 'AI coding assistant by GitHub', (SELECT id FROM categories WHERE name = 'Code AI'), 'https://github.com/features/copilot', 'https://github.githubassets.com/images/modules/site/features/copilot-icon.svg', ARRAY['Code completion', 'Documentation', 'Debugging', 'Testing'], 'Paid', 4.7),
  ('Cursor', 'AI-first code editor', (SELECT id FROM categories WHERE name = 'Code AI'), 'https://cursor.com', 'https://cursor.com/img/logo.svg', ARRAY['Code generation', 'Refactoring', 'Chat', 'Terminal'], 'Freemium', 4.6),
  ('Perplexity', 'AI search engine with sources', (SELECT id FROM categories WHERE name = 'Search AI'), 'https://www.perplexity.ai', 'https://www.perplexity.ai/favicon.ico', ARRAY['Web search', 'Sources', 'Real-time', 'Analysis'], 'Freemium', 4.5),
  ('You.com', 'Personalized AI search engine', (SELECT id FROM categories WHERE name = 'Search AI'), 'https://you.com', 'https://you.com/favicon.ico', ARRAY['Search', 'Personalization', 'Privacy', 'Integration'], 'Free', 4.2),
  ('Eleven Labs', 'AI voice generation platform', (SELECT id FROM categories WHERE name = 'Voice AI'), 'https://elevenlabs.io', 'https://cdn.elevenlabs.io/v1/avatar/01GPT2GQT69NW56ZqCQv21ZJ', ARRAY['Voice synthesis', 'Text-to-speech', 'Voice cloning', 'Multilingual'], 'Freemium', 4.6),
  ('Google NotebookLM', 'AI research notebook', (SELECT id FROM categories WHERE name = 'Text AI'), 'https://notebooklm.google.com', 'https://www.google.com/favicon.ico', ARRAY['Research', 'Notes', 'Audio generation', 'Summarization'], 'Free', 4.3);
