import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../components/firebase/firebase-config";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // subscribe to auth state changes
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      const userData = {
        id: user?.uid ?? null,
        isAnonymous: user?.isAnonymous ?? null,
        email: user?.email ?? null,
        providerID: user?.providerData[0]?.providerId ?? null,
      };
      setCurrentUser(userData);
    });

    // unsubscribe from auth state changes
    return () => unSub();
  }, []);

  return currentUser;
};

export default useAuth;
