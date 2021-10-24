import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCjwvoIL_36vTmH7qsYsfYcHIoyV09WktA",
  authDomain: "ewitter-d423c.firebaseapp.com",
  projectId: "ewitter-d423c",
  storageBucket: "ewitter-d423c.appspot.com",
  messagingSenderId: "521742630526",
  appId: "1:521742630526:web:6095ed19ca4cd85ddba22f"
};

initializeApp(firebaseConfig);

const authService = getAuth();

export default authService;