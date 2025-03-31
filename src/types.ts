export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
}

export interface ResourceSubmission {
  name: string;
  email: string;
  resourceName: string;
  resourceUrl: string;
  description: string;
  category: string;
  newCategory?: string;
}

export interface SiteStats {
  visitors: number;
  categoryCount: number;
  resourceCount: number;
  deployDate: string;
}