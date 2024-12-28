'use client';

import React, { SyntheticEvent } from 'react';
import Image from 'next/image';
import LogoImg from '@/assets/logo.jpeg';
import { FaArrowRightLong } from 'react-icons/fa6';
import AuthLayout from '@/app/(AuthLayout)/layouts/AuthLayout';
import Background from '@/assets/background/authbg.jpeg';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/features/authSlice/authApi';

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = React.useState({
    emailOrUsername: '',
    password: '',
  });

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const res = await login(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.push(`/verify-code?hexCode=${res.data.hexCode}`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed.', {
        className: 'bg-red-300 text-gray-800',
        duration: 2000,
      });
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-[#0000003D] backdrop-blur-[24px] shadow-md rounded-lg p-8 max-w-xl w-full">
        <div className="flex items-center justify-center pb-8">
          <Image
            src={LogoImg.src}
            alt="Grommr"
            width={LogoImg.width}
            height={LogoImg.height}
            className="h-auto w-44"
          />
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email or Username
            </label>
            <input
              type="text"
              value={formData.emailOrUsername}
              onChange={(e) =>
                setFormData({ ...formData, emailOrUsername: e.target.value })
              }
              placeholder="Enter mail or Username"
              className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none text-white"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox rounded text-yellow-500 focus:ring-0"
              />
              <span className="text-white">Remember Me</span>
            </label>
            <Link href="/forgot-password" className="text-red-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-5 bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Log in <FaArrowRightLong />
          </button>
        </form>

        <p className="text-sm text-center text-white mt-6">
          If you are new here then{' '}
          <Link href="/sign-up" className="text-yellow-500 font-medium hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

// Attach AuthLayout to this page
LoginPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
