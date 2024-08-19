"use client";

import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";

interface Props {
  pages: {
    name: string;
    href: string;
  }[];
}

const BreadcrumbsDefault: React.FC<Props> = ({ pages }) => {
  return (
    <Breadcrumbs>
      {pages.map((item, index) => {
        console.log(index);
        return (
          <Link
            key={index}
            href={item.href}
            className={`${pages.length - 1 === index ? "" : "opacity-60"}`}
          >
            {item.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsDefault;
