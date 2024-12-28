'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LogoImg from '@/assets/logo.jpeg';
import check from '@/assets/check.png';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyOtpMutation } from '@/redux/features/authSlice/authApi';
import { toast } from 'sonner';
import { setUser } from "@/redux/features/authSlice/authSlice";
import { useDispatch } from 'react-redux';


export default function VerifyCodePage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const searchParams = useSearchParams();
  const hexCode: any = searchParams.get('hexCode');

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Allow only single-character input

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    // Move focus to the next input if the current input is filled
    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      const previousInput = document.getElementById(`otp-input-${index - 1}`);
      previousInput?.focus();
    }
  };

  const [verifyOtp] = useVerifyOtpMutation();
  const router = useRouter();
const dispatch = useDispatch()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification Code:', code.join(''));
    // Implement API call for verifying the code
    const otp = code.join('');

    try {
      const res = await verifyOtp({ hexCode, otp }).unwrap();
      console.log(res.data);
      if (res.success) {
        toast.success(res.message);
        dispatch(
          setUser({
            token: res.data,
            user: undefined
          })
        );
        router.push('/');
      }
    } catch (error) {
      toast.error('Login failed:', {
        className: 'bg-red-300 text-gray-800',
        description: (error as { data: any })?.data.message,
        duration: 2000,
      });
      // console.error('Login failed', error);
      console.log((error as { data: any }).data);
    }
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
    <div
      className='flex justify-center items-center min-h-screen'
      style={{
        backgroundColor: '#4C3F14',
      }}>
      <div className='bg-[#0000003D] backdrop:blur-[24px] shadow-md rounded-lg p-8 max-w-md w-full'>
        <div className='flex items-center justify-center pb-8'>
          <Image
            src={LogoImg.src}
            alt='Plumppr'
            width={LogoImg.width}
            height={LogoImg.height}
            className='h-auto w-44'
          />
        </div>
        <Image
          src={check}
          width={80}
          className='mx-auto'
          alt='check success image'
        />
        <h2 className='text-white text-[40px] font-bold text-center pb-4'>
          Success
        </h2>
        <p className='text-white text-center text-sm mb-6'>
          Please check your email to create a new password
        </p>
        <form
          className='space-y-6'
          onSubmit={handleSubmit}>
          <div className='flex justify-center gap-2'>
            {code.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-transparent text-white text-xl"
              />
            ))}
          </div>
          <button
            type='submit'
            className='w-full bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'>
            Submit
          </button>
        </form>
      </div>
    </div>
    </React.Suspense>
  );
}
