"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice/authSlice";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RootState } from "@/redux/store";

interface DecodedToken extends JwtPayload {
  id: string;
  role?: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Unconditionally call all hooks
  const route = usePathname();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle client-side rendering logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  // Decode the token unconditionally
  const decodedToken = token ? (jwt.decode(token) as DecodedToken) : null;

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log("isAuthenticated", isAuthenticated);

  
  const handleLogout = async() => {
    dispatch(logout());
    router.push("/");
  };

  // Conditional rendering
  if (!isClient) return null; // Avoid rendering until the component is mounted

  // Avoid rendering on certain routes
  if (/^\/(signUp|login|forgetPassword|verifyCode|resetPassword)/.test(route)) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[200] px-5 md:px-0">
      {/* Logo Section */}
      <div className="flex items-center justify-between my-7 md:container">
        <Link href="/">
          <Image
            src={LogoImg}
            alt="Plumppr Logo"
            width={150}
            height={50}
            className="h-auto md:w-[240px] w-[150px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="md:flex items-center justify-between gap-28 bg-[#483C19] rounded-2xl shadow-md py-4 px-6 hidden">
          <div className="flex items-center gap-8">
            {/* Notification Button */}
            <Link href="/notification">
              <button className="md:flex items-center px-4 py-2 text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-black transition hidden">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .415-.162.82-.405 1.136L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </span>
                Notification
              </button>
            </Link>

            {/* Message Button */}
            <Link href="/message">
              <button className="md:flex items-center px-4 py-2 text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-black transition hidden">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 12h9m-9 4h5m-5-8h9m2.25-2.25v12.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75z"
                    />
                  </svg>
                </span>
                Message
              </button>
            </Link>
          </div>

            {/* Right Section (Logout & Settings Buttons) */}
            <div className="flex items-center gap-8">
              <div className="flex items-center border-r border-gray-300 pr-4">
                {
                  decodedToken ? (
                    <Link href={'/'}>
                      <button onClick={handleLogout} className="md:flex items-center px-4 py-2 text-white bg-red-900 rounded-md transition hidden">
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-3-6l3 3m0 0l-3 3m3-3H9"
                            />
                          </svg>
                        </span>
                        Logout
                      </button>
                    </Link>
                  ) : (
                    <Link href={'/login'} className="md:flex items-center px-4 py-2 text-white bg-accent rounded-md transition hidden">
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-3-6l3 3m0 0l-3 3m3-3H9"
                          />
                        </svg>
                      </span>
                      Log in
                    </Link>
                  )
                }
                {/* <button onClick={handleLogOut} className="md:flex items-center px-4 py-2 text-white bg-red-900 rounded-md transition hidden">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-3-6l3 3m0 0l-3 3m3-3H9"
                      />
                    </svg>
                  </span>
                  Logout
                </button> */}
              </div>

            {/* Settings Button */}
            {isAuthenticated && (
              <button className="flex items-center px-4 py-2 text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-black transition">
                <IoSettingsOutline className="w-5 h-5" />
              </button>
            )}
          </div>
        </nav>

        {/* Hamburger Button */}
        <div className="md:hidden block">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none bg-primary px-4 py-2 rounded-md"
          >
            {isMenuOpen ? (
              <MdClose className="text-[35px]" />
            ) : (
              <MdMenu className="text-[35px]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col bg-[#483C19] py-4 px-6 shadow-md w-[175px] absolute right-0 top-[81px] gap-2">
          <Link href="/notification" onClick={() => setIsMenuOpen(false)}>
            <button className="block w-full text-left px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-black transition">
              Notification
            </button>
          </Link>
          <Link href="/message" onClick={() => setIsMenuOpen(false)}>
            <button className="block w-full text-left px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-black transition">
              Message
            </button>
          </Link>

          {isAuthenticated ? (
            <button
              className="block w-full text-left px-4 py-2 text-white bg-red-900 rounded-md hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="block w-full text-left px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;