export const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
export const FIREBASE_API_KEY =
  process.env.FIREBASE_API_KEY ?? process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const { NODE_ENV, NEXT_PUBLIC_ENV } = process.env;

export const isDev =
  NODE_ENV === "development" || NEXT_PUBLIC_ENV === "development";
