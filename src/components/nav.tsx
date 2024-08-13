"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignOutButton, SignedIn, SignedOut, useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Action } from '../lib/interfaces';

const Nav: React.FC = () => {
  const [openLink, setOpenLink] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const { getToken, signOut } = useAuth();

  const toggleOpen = (to: string) => {
    setOpenLink((prevState) => (prevState === to ? null : to));
  };

  const actions: Action[] = [
    { name: "explore all", to: "/main" },
  ];

  const authenticateUser = async () => {
    if (user) {
      try {
        const token = await getToken({ template: "authentication-template" });
        if (token) {
          const response = await fetch('/api/authentication', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.error) {
            console.error(data.error);
          } else {
            console.log('User authenticated:', data.db_user);
            setRole(data.db_user?.role);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    authenticateUser();
  }, [user, getToken]);

  const handleSignOut = async () => {
    try {
      setRole(null);
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };


  return (
    <div className="flex z-101 w-full flex-row justify-between py-4 px-8 items-center">
      <div className="py-4 z-100"></div>
      <ul className="flex flex-row gap-6 font-bebas items-center py-5 px-10">
        {actions.map((link) => (
          <li key={link.to} onClick={() => toggleOpen(link.to)} className="relative">
            <div
              className={`text-sm md:text-lg uppercase text-black cursor-pointer flex flex-row items-center justify-center gap-1 md:gap-2`}
            >
              {role === 'ADMIN' && link.to === '/main' && (
                <Link href={'/admin'}>
                  <span>ADMIN </span>
                </Link>
              )}
              <Link className={`text-${link.to === router.pathname ? 'pink' : 'black'}`} href={link.to}>
                <span>{link.name}</span>
              </Link>
            </div>
          </li>
        ))}

        <SignedOut>
          <div className="md:text-[17px] text-[16px] cursor-pointer">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div onClick={handleSignOut} className="md:text-[17px] text-[16px] cursor-pointer">
            <SignOutButton />
          </div>
        </SignedIn>
      </ul>
    </div>
  );
};

export default Nav;
