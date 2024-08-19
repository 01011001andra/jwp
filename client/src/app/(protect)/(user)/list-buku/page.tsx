import BreadcrumbsDefault from "@/components/BreadcrumbsDefault";
import React from "react";
import TablePage from "./components/TablePage";

const ListBuku = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <BreadcrumbsDefault pages={[{ name: "List Buku", href: "/list-buku" }]} />
      <div>
        <TablePage />
      </div>
    </div>
  );
};

export default ListBuku;
