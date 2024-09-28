'use client'

import { useState } from 'react';
import Index from "./pages/Index"; // Adjust the import path as needed

export default function Home() {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <Index userId={userId} name={userName} />
  );
}