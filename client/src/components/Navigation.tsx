"use client";

import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { hideMainComponent } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";
import Link from "next/link";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { loginResponse, setLoginResponse } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href={"#home"}>Home</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href={"#tentang-kami"}>Tentang Kami</Link>
      </Typography>
    </ul>
  );

  if (hideMainComponent.includes(pathname)) return null;

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between  max-w-screen-2xl mx-auto text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer font-bold "
          onClick={() => router.push("/")}
        >
          e-Borrow
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {loginResponse ? (
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => {
                  router.push("/");
                  setLoginResponse(null);
                }}
              >
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link href={"/login"}>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    // onClick={() => router.push("/login")}
                  >
                    <span>Log In</span>
                  </Button>
                </Link>

                <Link href={"/register"}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    // onClick={() => router.push("/register")}
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button
            fullWidth
            variant="text"
            size="sm"
            className=""
            onClick={() => router.push("/login")}
          >
            <span>Log In</span>
          </Button>
          <Button
            fullWidth
            variant="gradient"
            size="sm"
            className=""
            onClick={() => router.push("/register")}
          >
            <span>Sign Up</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
