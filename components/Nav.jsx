"use client";

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data:session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState (false);

  useEffect( () => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">

      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Beenthere Logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text">Beenthere</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Button asChild>
              <Link href="/create-trip" className="black_btn">
                Create Trip
              </Link>
            </Button>
            
            <Button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </Button>
          
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Image">
              </Image>
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(prev => !prev)}>
            </Image>
          
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                      My Profile
                  </Link>
                  <Link
                    href="/create-trip"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                      Create Trip
                  </Link>
                  <button 
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ): (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}

      </div>

    </nav>
  );
};
export default Nav;
