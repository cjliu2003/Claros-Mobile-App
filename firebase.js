import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getStorage} from "firebase/storage";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCZAQl2VLDPcVFj-2wYI_tMBOdtQmQp6gM",
    authDomain: "beat-the-books-users.firebaseapp.com",
    databaseURL: "https://beat-the-books-users-default-rtdb.firebaseio.com",
    projectId: "beat-the-books-users",
    storageBucket: "beat-the-books-users.appspot.com",
    messagingSenderId: "1003042902666",
    appId: "1:1003042902666:web:aafe81d58feb3c14c15373",
    measurementId: "G-7QGNJ6LSXJ"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const firestore = getFirestore(app);
  const auth = getAuth();

  export {auth}
  export {firestore};
  export {database};
  export const storage = getStorage(app);
