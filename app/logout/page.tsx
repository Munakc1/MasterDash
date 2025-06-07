// app/logout/page.tsx

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear localStorage/session
    localStorage.clear();

    // Optionally clear cookies or API tokens here
    // document.cookie = '';

    // Redirect to login/home page after logout
    router.replace('/');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      Logging out...
    </div>
  );
}
