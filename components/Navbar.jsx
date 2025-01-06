"use client";
import { useState } from "react";
import NavLink from "next/link";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import logo from '@/public/logo.png'
import Image from 'next/image'


export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <>
      <nav className="shadow-sm text-xl flex justify-between items-center border-b-2 py-2 px-4 text-black bg-[#aea3a3] font-inter fixed top-0 left-0 w-full z-10">
        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <Image src={logo} alt="image"></Image>
          <h2 className="text-2xl font-bold">E-Commerce</h2>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink className="text-sm font-bold" href="/">Home</NavLink>
          <NavLink className="text-sm font-bold" href="/Men">Men</NavLink>
          <NavLink className="text-sm font-bold" href="/Women">Women</NavLink>
          <NavLink className="text-sm font-bold" href="/Kids">Kids</NavLink>
        </div>

        {/* Menu Toggle for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{session.user?.name?.split(" ")[0]}</span>
              <button
                className="flex items-center"
                onClick={handleLogout}
              >
                <CgProfile color="green" size={30} />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-white text-black rounded-full px-4 py-1">
                Login/Signup
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 w-2/3 h-full bg-black text-white flex flex-col items-center justify-start space-y-4 transition-transform duration-300 pt-16 z-20 md:hidden`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>

          <NavLink className="text-sm font-bold" href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink className="text-sm font-bold" href="/Men" onClick={() => setIsMenuOpen(false)}>
            Men
          </NavLink>
          <NavLink className="text-sm font-bold" href="/Women" onClick={() => setIsMenuOpen(false)}>
            Women
          </NavLink>
          <NavLink className="text-sm font-bold" href="/Kids" onClick={() => setIsMenuOpen(false)}>
            Kids
          </NavLink>

          <div className="mt-4 space-y-4">
            {session ? (
              <div className="flex flex-col items-center space-y-2">
                <span className="font-medium text-sm">{session.user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-1"
                >
                  <CgProfile color="green" size={30} />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-white text-black rounded-full px-4 py-2 w-full">
                  Login/Signup
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Overlay for Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </nav>
    </>
  );
}