import Link from "next/link";
import React from "react";
import Logo from "../ui/logo";
import { TbBook } from "react-icons/tb";
import { FaFeatherAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="p-4 max-md:pb-0 max-md:pr-0 flex flex-wrap gap-5 flex-col sm:flex-row justify-between ">
      <Logo />
      <div className="flex-1 flex font-ubuntu  justify-end">
        <nav className="flex max-w-lg text-sm items-center justify-center bg-gradient-to-b from-[#FDFDFD] to-[#D5CDCB] py-0 px-3 rounded-lg max-md:rounded-b-none max-md:rounded-r-none md:shadow-md border border-gray-300">
          <ul className="flex items-center text-xs transition-colors font-medium text-text-tea">
            <li
              style={{ textShadow: "1px 1px 2px white" }}
              className="flex items-center hover:text-hover-blue active:text-hover-blue font-semibold transition-colors space-x-2"
            >
              <Link href="/">Home</Link>
            </li>
            <span className="h-8 border-r border-dotted border-gray-400 mx-2 md:mx-4"></span>{" "}
            {/* Divider */}
            <li
              style={{ textShadow: "1px 1px 2px white" }}
              className="flex items-center hover:text-hover-blue active:text-hover-blue font-semibold transition-colors sm:space-x-2"
            >
              <span className="material-icons max-sm:hidden">
                <TbBook className="text-base" />
              </span>
              <Link href="/FAQ">Gaining FAQ</Link>
            </li>
            <span className="h-8 border-r border-dotted border-gray-400 mx-2 md:mx-4"></span>{" "}
            {/* Divider */}
            <li
              style={{ textShadow: "1px 1px 2px white" }}
              className="flex items-center hover:text-hover-blue active:text-hover-blue font-semibold transition-colors sm:space-x-1"
            >
              <FaFeatherAlt className="max-sm:hidden" />
              <Link href="/about">About Us</Link>
            </li>
            <span className="h-8 border-r border-dotted border-gray-400 mx-2 md:mx-4"></span>{" "}
            {/* Divider */}
            <li
              style={{ textShadow: "1px 1px 2px white" }}
              className="flex items-center hover:text-hover-blue active:text-hover-blue font-semibold transition-colors space-x-2"
            >
              <Link href="/community">Community</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
