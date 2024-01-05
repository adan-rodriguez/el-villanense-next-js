import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY } from "./config";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "el-villanense-4efa5.firebaseapp.com",
  projectId: "el-villanense-4efa5",
  storageBucket: "el-villanense-4efa5.appspot.com",
  messagingSenderId: "703366970993",
  appId: "1:703366970993:web:bb2eb3bcb3cbbf95d1a5d0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
