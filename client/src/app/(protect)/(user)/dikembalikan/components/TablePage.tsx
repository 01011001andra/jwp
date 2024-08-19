"use client";

import { Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import React from "react";
import Confirm from "./Confirm";
import { useAuth } from "@/store/useAuth";
import useGetPinjam from "@/hooks/pinjam/useGetPinjam";

const TABLE_HEAD = ["Nama", "Kategori", "Pesan", "Status"];

export default function TablePage() {
  const { loginResponse } = useAuth();
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useGetPinjam({
    limit: 10,
    page: page,
    search: "",
    username: loginResponse?.username,
    status: "returned",
  });

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentData, setCurrentData] = React.useState({
    username: "",
    email: "",
    nama_buku: "",
    kategori_buku: "",
    deskripsi_buku: "",
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
            {data?.data.map((item: any, index: number) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.nama_buku}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.kategori_buku}
                  </Typography>
                </td>
                <td className="p-4 max-w-5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal truncate"
                  >
                    <Tooltip content={item.pesan ? item.pesan : "-"}>
                      {item.pesan ? item.pesan : "-"}
                    </Tooltip>
                  </Typography>
                </td>
                <td className="p-4 flex gap-2">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`p-2 text-xs uppercase text-white font-bold rounded-lg bg-green-500 `}
                    >
                      {item.status}
                    </Typography>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Confirm open={openConfirm} setOpen={setOpenConfirm} data={currentData} />
    </div>
  );
}
