'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  // Example state to toggle a message color ternary
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Example: simple validation (toggle error message)
    const form = e.currentTarget;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!phone.match(/^\d{10}$/)) {
      setHasError(true);
      return;
    }

    setHasError(false);
    localStorage.setItem('loggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'linear-gradient(135deg, #0077B6 0%, #023E8A 70%, #03045E 100%)',
      }}
    >
      <div className="w-full max-w-md p-10 bg-white bg-opacity-90 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-extrabold mb-3 text-[#023E8A] text-center tracking-wide">
          Dashboard
        </h2>
        <p className="text-center text-gray-700 mb-8 text-base font-medium">
          Sign in to your account
        </p>

        {/* Conditional text with ternary for color */}
        {hasError && (
          <p className="mb-4 text-center text-red-600 font-semibold">
            Please enter a valid 10-digit phone number.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-3 border border-[#5FA8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder-gray-400 transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-[#5FA8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder-gray-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0077B6] hover:bg-[#005f8f] text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Sign in
          </button>
        </form>

       <p className="text-xs text-center mt-8 text-gray-600 tracking-wide">
  By signing in, you agree to our{' '}
  <span className="text-[#0077B6] font-semibold cursor-pointer hover:underline">
    Terms
  </span>{' '}
  and{' '}
  <span className="text-[#0077B6] font-semibold cursor-pointer hover:underline">
    Privacy Policy
  </span>
  .
</p>
      </div>
    </div>
  );
}
