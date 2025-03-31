import { Resource, SiteStats } from '../types';

export const initialResources: Resource[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced language model by OpenAI for natural conversations and text generation',
    url: 'https://chat.openai.com',
    category: 'Language Models'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered tool for generating stunning artwork and illustrations',
    url: 'https://www.midjourney.com',
    category: 'Image Generation'
  },
  {
    id: '3',
    name: 'Hugging Face',
    description: 'Platform for sharing and discovering AI models and datasets',
    url: 'https://huggingface.co',
    category: 'Development Tools'
  }
];

export const categories = [
  'Language Models',
  'Image Generation',
  'Development Tools',
  'Audio Processing',
  'Video Generation',
  'Other'
];

export const siteStats: SiteStats = {
  visitors: 1205,
  categoryCount: categories.length,
  resourceCount: initialResources.length,
  deployDate: '2024-03-01'
};