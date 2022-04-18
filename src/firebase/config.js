import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmHnrIbKzA11y57xX47wLxbwhW_hyUgOA",
  authDomain: "romulo-blog.firebaseapp.com",
  projectId: "romulo-blog",
  storageBucket: "romulo-blog.appspot.com",
  messagingSenderId: "52002088675",
  appId: "1:52002088675:web:a5588e50d03d204b9dc7d6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app)

export { db };
