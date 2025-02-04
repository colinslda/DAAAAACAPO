import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhRyFF0kJR4sSj3mCl-QMcjJ7mpekSDsA",
  authDomain: "dacapoapp.firebaseapp.com",
  projectId: "dacapoapp",
  storageBucket: "dacapoapp.firebasestorage.appT",
  messagingSenderId: "456964485321",
  appId: "1:456964485321:web:1c993f028c8a49fdc11d18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Gestion de l'authentification
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Redirection vers l'app
  } catch (error) {
    console.error("Erreur d'authentification:", error);
  }
});

// Authentification Google
document.getElementById('google-signin').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Erreur Google Auth:", error);
  }
});
