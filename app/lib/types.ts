type CreatedAt = {
  _seconds: number;
  _nanoseconds: number;
};

export type ArticleData = {
  title: string;
  lead: string;
  image: string;
  altImage: string;
  content: string;
  authors: string[];
  anonymous: boolean;
  createdAt: CreatedAt;
};

export type Article = { id: string } & ArticleData;

export type AuthorData = {
  nick: string;
  name: string;
  email?: string;
  image?: string;
  superAdmin?: boolean;
};

export type Author = { id: string } & AuthorData;
