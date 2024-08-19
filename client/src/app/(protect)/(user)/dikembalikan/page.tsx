import BreadcrumbsDefault from "@/components/BreadcrumbsDefault";
import React from "react";
import TablePage from "./components/TablePage";

const Pinjam = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <BreadcrumbsDefault
        pages={[{ name: "Permintaan Peminjam", href: "/pinjam" }]}
      />
      <div>
        <TablePage />
      </div>
    </div>
  );
};

export default Pinjam;
