"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from '@/app/ui/Auth/button';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      
      await login(email, password);
      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (err: any) {
      console.error('[LoginForm] Login failed:', err);
      setError(err?.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[40%] max-w-[500px] min-w-[320px] flex flex-col p-6 sm:w-[90%] sm:p-11 md:w-[85%] lg:w-[60%] xl:w-[35%]">
      {/*Logo section*/}
      <div className="flex justify-center items-center">
        <img alt="company logo" src="/images/logo.png" className="w-24 h-24" />
      </div>
      {/*Title and Subtitle*/}
      <h2 className="text-4xl font-bold leading-[3.75rem] text-lime-600">
        Login
      </h2>
      <p className="text-base font-light text-indigo-950">
        To stay connected with us
      </p>
      {/*Form section*/}
      <div className="mt-4 w-full flex flex-col items-stretch">
        <form onSubmit={handleSubmit} className="w-full">
          {/*Email*/}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full text-indigo-950 p-4 sm:p-5 mt-4 border-2 border-gray-300 rounded-xl focus:ring-1 focus:ring-[#66cc00] focus:border-[#66cc00] focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full text-indigo-950 p-4 sm:p-5 mt-7 border-2 border-gray-300 rounded-xl focus:ring-1 focus:ring-[#66cc00] focus:border-[#66cc00] focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {/*Error*/}
          {error && <div className="text-red-600 text-center mt-4">{error}</div>}
          {/*Submit button*/}
          <div className="flex justify-center mt-7">
            <Button disabled={isLoading}>{isLoading ? 'LOGGING IN...' : 'LOG IN'}</Button>
          </div>
        </form>
        <div className="mt-2 flex justify-center">
          <p className="font-normal text-sm text-indigo-950 cursor-pointer">
            <Link href="forgot-password">
            Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
