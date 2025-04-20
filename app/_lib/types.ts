// types.ts
export type Book = {
  id: string;
  title:string;
  authors: string[];
  publisher: string;
  published_date: string;
  description: string;
  page_count: number;
  categories: string[];
  language: string;
  avg_rating: number;
  prev_link: string;
  thumbnail_url: string;
  created_at: Date;
};

export type BookCardProps = {
  title: string;
  authors: string[];
  description: string;
  categories: string[];
  avg_rating: number;
  thumbnail_url: string;
};
