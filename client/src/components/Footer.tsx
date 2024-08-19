"use client";

import { hideMainComponent } from "@/lib/utils";
import { Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  if (hideMainComponent.includes(pathname)) return null;

  return (
    <footer className="w-full bg-white p-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer font-bold "
            onClick={() => router.push("/")}
          >
            e-Borrow
          </Typography>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Home
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
          &copy; 2024 e-Borrow
        </Typography>
      </div>
    </footer>
  );
}
