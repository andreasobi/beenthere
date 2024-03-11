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

      <Link href="/" className="flex gap-2 flex-center pt-2">
        <Image
          src="/assets/images/beenthere-logo-2.png"
          alt="Beenthere Logo"
          width={300}
          height={100}
          className="object-contain"
        ></Image>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Button asChild>
              <Link href="/create-trip">
                Create Trip
              </Link>
            </Button>
            
            <Button variant="outline" onClick={signOut}>
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
        ) : 
        (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <Button
                  variant="outline" 
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </Button>
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
                  <Button asChild variant="link">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}>
                        My Profile
                    </Link>
                  </Button>

                  <Button asChild>
                    <Link
                      href="/create-trip"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}>
                        Create Trip
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                  }}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
          </div>
        ): (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </Button>
              ))}
          </>
        )}

      </div>

    </nav>
  );
};
export default Nav;
