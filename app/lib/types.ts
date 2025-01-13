type CreatedAt = {
  _seconds: number;
  _nanoseconds: number;
};

export type ArticleBasicData = {
  title: string;
  lead: string;
  image: string;
  altImage: string;
  content: string;
  authorsIds: string[];
  authors: {
    id: string;
    nick: string;
    name: string;
    image: string | null;
    anonymous: boolean;
  }[];
};

export type ArticleData = {
  title: string;
  lead: string;
  image: string;
  altImage: string;
  content: string;
  authorsIds: string[];
  authors: {
    id: string;
    nick: string;
    name: string;
    image: string | null;
    anonymous: boolean;
  }[];
  createdAt: CreatedAt;
  lastModified?: CreatedAt;
};

export type Article = { id: string } & ArticleData;

export type AuthorData = {
  nick: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  role: Role;
};

export type Author = { id: string } & AuthorData;

export type Role = "superadmin" | "editor";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  role: Role;
};
