import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hideMainComponent = [
  "/login",
  "/register",
  "/buku",
  "/peminjam",
  "/list-buku",
  "/pinjam",
  "/dikembalikan",
  "/history",
  "/dashboard",
  "/dashboards",
];
