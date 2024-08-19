"use client";

import {
  Button,
  Card,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import React from "react";
import Pinjam from "./Pinjam";
import useGetBuku from "@/hooks/buku/useGetBuku";

const TABLE_HEAD = ["Nama", "Kategori", "Deskripsi", "Action"];

export interface DataBuku {
  _id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  createdAt: string;
  updatedAt: string;
}
[];

export default function TablePage() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetBuku({
    limit: 10,
    page: page,
    search: "",
  });

  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentData, setCurrentData] = React.useState({
    nama: "",
    kategori: "",
    deskripsi: "",
  });

  const next = () => {
    if (page === data?.total) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };
  return (
    <div className="flex flex-col gap-6 items-end">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={page === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          {page}
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={page === data?.totalPages}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Input crossOrigin={"anonymous"} label="Search" />
        </div>
      </div>
      <Card className="h-full w-full overflow-x-auto ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: DataBuku, index: number) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.nama}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.kategori}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.deskripsi}
                  </Typography>
                </td>
                <td className="p-4 flex gap-2">
                  <div
                    onClick={() => {
                      setCurrentData({
                        nama: item?.nama,
                        kategori: item?.kategori,
                        deskripsi: item?.deskripsi,
                      });
                      setOpenEdit(true);
                    }}
                  >
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium bg-green-600 text-white p-2 rounded-full text-xs"
                    >
                      Pinjam
                    </Typography>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Pinjam open={openEdit} setOpen={setOpenEdit} data={currentData} />
    </div>
  );
}
