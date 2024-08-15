import { auth } from "../ConfigFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem("@reactLinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        console.log("NAO TEM USUARIO LOGADO");
        setLoading(false);
        setSigned(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
}
