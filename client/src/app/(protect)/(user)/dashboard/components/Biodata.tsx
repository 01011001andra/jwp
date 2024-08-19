"use client";

import SparklesText from "@/components/SparklesText";
import { Avatar, Spinner } from "@material-tailwind/react";
import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import UpdateBiodata from "./UpdateBiodata";
import Link from "next/link";
import useGetBuku from "@/hooks/buku/useGetBuku";
import useGetPeminjam from "@/hooks/pinjam/useGetPeminjam";
import useGetHistory from "@/hooks/pinjam/useGetHistory";
import { useAuth } from "@/store/useAuth";
import useGetPinjam from "@/hooks/pinjam/useGetPinjam";

// Komponen Card untuk menampilkan detail
const DetailCard = ({
  href,
  title,
  value,
  isLoading,
}: {
  href: string;
  title: string;
  value: string;
  isLoading: boolean;
}) => (
  <div className="rounded-md shadow-xl border">
    <div className="p-4">
      <div className="w-full flex justify-between items-center">
        <MdModeEditOutline className="text-black/70" size={24} />
        <div className="flex gap-2 items-end flex-col">
          <span className="text-sm">{title}</span>
          {isLoading ? <Spinner /> : <span className="font-bold">{value}</span>}
        </div>
      </div>
    </div>
    <hr />
    <div className="p-4">
      <Link href={href} className="text-xs">
        Lihat detail
      </Link>
    </div>
  </div>
);

const Biodata = () => {
  const [open, setOpen] = React.useState(false);
  const { loginResponse } = useAuth();
  const { data: bukuData, isLoading: bukuIsLoad } = useGetBuku({
    limit: 10,
    page: 1,
    search: "",
  });

  const { data: pinjamData, isLoading: pinjamIsLoad } = useGetPinjam({
    limit: 10,
    page: 1,
    search: "",
    username: loginResponse?.username,
    status: "",
  });
  const { data: returnedData, isLoading: returnedIsLoad } = useGetPinjam({
    limit: 10,
    page: 1,
    search: "",
    username: loginResponse?.username,
    status: "returned",
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="xxl"
          className="mx-auto md:mx-0"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-center justify-center md:items-start md:justify-start">
            <div className="flex items-center gap-2">
              <SparklesText
                text={loginResponse?.username}
                className="text-3xl text-black/70 text-center md:text-start"
              />
              <MdModeEditOutline
                className="text-black/70 cursor-pointer hover:text-green-600"
                size={24}
                onClick={() => setOpen(!open)}
              />
            </div>
            <small>Email: {loginResponse?.email}</small>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <DetailCard
              href="/list-buku"
              title="Jumlah buku"
              value={bukuData?.total}
              isLoading={bukuIsLoad}
            />
            <DetailCard
              href="/pinjam"
              title="Status pinjam"
              value={pinjamData?.total}
              isLoading={pinjamIsLoad}
            />
            <DetailCard
              href="/dikembalikan"
              title="Dikembalikan"
              value={returnedData?.total}
              isLoading={returnedIsLoad}
            />
          </div>
        </div>
      </div>
      <UpdateBiodata
        data={{ id: "", nama: "", kategori: "", deskripsi: "" }}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Biodata;
