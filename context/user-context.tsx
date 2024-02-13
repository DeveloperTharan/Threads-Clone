"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

interface userContextProps {
  User: User | null;
}

export const userContext = createContext<userContextProps | undefined>(
  undefined
);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<User | null>(null);

  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn) {
        return;
      }

      try {
        const res = await axios.get("/api/profile");
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isSignedIn]);

  return (
    <userContext.Provider value={{ User: userData }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = (): userContextProps => {
  const context = useContext(userContext);

  if (!context) return { User: null };

  return context;
};
