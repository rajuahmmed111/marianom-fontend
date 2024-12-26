'use client';
import React, { SyntheticEvent } from 'react';
import Image from 'next/image';
import LogoImg from '@/assets/logo.jpeg';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Background from '@/assets/background/authbg.jpeg';
import { useRegisterMutation } from '@/redux/features/authSlice/authApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    passwordConfirm: '',

    firstName: '',
    lastName: '',
    userName: '',
    dateOfBirth: '',
    location: '',
    identity: [] as string[],
    agree: false,
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(formData);
    try {
      try {
        const res = await register(formData).unwrap();
        console.log(res.data);
        toast.success('Registration successful!');
        router.push('/');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error((error as { message: string })?.message);
    }
  };

  return (
    <div
      className='relative flex justify-center items-center min-h-screen'
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* Background Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>

      {/* Registration Card */}
      <div className='relative z-10 bg-[#00000099] backdrop-blur-[12px] shadow-lg rounded-lg p-8 max-w-lg w-full text-white'>
        {/* Logo */}
        <div className='flex justify-center pb-6'>
          <Image
            src={LogoImg}
            alt='Plumppr Logo'
            width={150}
            height={50}
            priority
            className='h-auto w-auto'
          />
        </div>

        {/* Heading */}
        <h2 className='text-center text-2xl font-semibold mb-6'>
          Create new account
        </h2>

        {/* Form */}
        <form
          className='space-y-4'
          onSubmit={(e) => onSubmit(e)}>
          <div>
            <label className='block text-sm font-medium mb-1'>
              Email address
            </label>
            <input
              type='email'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder='Enter your email'
              className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <input
              type='password'
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder='Enter your password'
              className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>
              confirm Password
            </label>
            <input
              type='password'
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
              placeholder='Enter your password'
              className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
            />
          </div>

          <div className='flex items-center gap-3'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                First name
              </label>
              <input
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder='Enter your first name'
                className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Last name
              </label>
              <input
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder='Enter your last name'
                className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>User name</label>
            <input
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder='Enter your user name'
              className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
            />
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium mb-1'>
              Date of birth
            </label>
            <input
              type='date'
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none'
            />
          </div>

          <div className='relative bg-[#483C19B5] py-5 px-3 rounded-2xl'>
            <label className='block text-sm font-medium mb-1'>
              Your current location
            </label>
            <input
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder='Street address, city, state'
              className='w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none'
            />
            <p className='flex items-center justify-center mt-4 w-full text-yellow-500'>
              <FaMapMarkerAlt /> Use my current location
            </p>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>
              I identify as:
            </label>
            <div className='flex flex-col gap-2'>
              <label className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        identity: [...formData.identity, 'GAINER'],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        identity: formData.identity.filter(
                          (item) => item !== 'GAINER'
                        ),
                      });
                    }
                  }}
                  className='form-checkbox rounded text-yellow-500 focus:ring-0'
                />
                <span>Gainer</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        identity: [
                          ...formData.identity,
                          'FEEDER_OR_ENCOURAGER',
                        ],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        identity: formData.identity.filter(
                          (item) => item !== 'FEEDER_OR_ENCOURAGER'
                        ),
                      });
                    }
                  }}
                  className='form-checkbox rounded text-yellow-500 focus:ring-0'
                />
                <span>Feeder/encourager</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        identity: [...formData.identity, 'MUSCLE_GAINER'],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        identity: formData.identity.filter(
                          (item) => item !== 'MUSCLE_GAINER'
                        ),
                      });
                    }
                  }}
                  className='form-checkbox rounded text-yellow-500 focus:ring-0'
                />
                <span>Muscle gainer</span>
              </label>
            </div>
          </div>

          <div>
            <label className='flex items-center space-x-2 text-sm'>
              <input
                type='checkbox'
                className='form-checkbox rounded text-yellow-500 focus:ring-0'
                required
              />
              <span>
                I agree to the{' '}
                <a
                  href='#'
                  className='text-yellow-500 hover:underline'>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href='#'
                  className='text-yellow-500 hover:underline'>
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          <button
            type='submit'
            className='w-full flex items-center justify-center gap-3 bg-yellow-500 text-white font-medium py-2 rounded-md transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'>
            Create <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
