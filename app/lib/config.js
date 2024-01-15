export const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

export const FIREBASE_API_KEY =
  process.env.FIREBASE_API_KEY ?? process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export const isDev =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_ENV === "development";
