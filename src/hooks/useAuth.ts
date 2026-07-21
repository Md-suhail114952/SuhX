import { useState, useEffect } from "react";
import { 
  User, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Helper to ensure user document exists in Firestore
  const ensureUserDoc = async (authUser: User, name: string) => {
    const userRef = doc(db, "users", authUser.uid);
    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const userData = {
          uid: authUser.uid,
          name: name || authUser.displayName || "Anonymous Partner",
          email: authUser.email || "",
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, userData);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${authUser.uid}`);
    }
  };

  // Sign up with Email and Password
  const signUp = async (name: string, email: string, signupPassword1: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, signupPassword1);
      const newUser = userCredential.user;
      
      // Update display name
      await updateProfile(newUser, { displayName: name });
      
      // Ensure Firestore document
      await ensureUserDoc(newUser, name);
      
      setUser({ ...newUser, displayName: name });
      return newUser;
    } catch (err) {
      console.error("Sign up error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Email and Password
  const signIn = async (email: string, signinPassword1: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, signinPassword1);
      const signedInUser = userCredential.user;
      
      // Ensure Firestore document exists in case of previous issues
      await ensureUserDoc(signedInUser, signedInUser.displayName || "");
      
      return signedInUser;
    } catch (err) {
      console.error("Sign in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google Popup
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const signedInUser = userCredential.user;
      
      // Ensure Firestore document
      await ensureUserDoc(signedInUser, signedInUser.displayName || "");
      
      return signedInUser;
    } catch (err) {
      console.error("Google login error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Log out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logOut
  };
}
