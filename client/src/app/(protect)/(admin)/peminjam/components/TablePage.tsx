"use client";

import { Button, Card, Typography, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import React from "react";
import Confirm from "./Confirm";
import useGetPeminjam from "@/hooks/pinjam/useGetPeminjam";
import Approve from "./Approve";
import Reject from "./Reject";

const TABLE_HEAD = ["Username", "Email", "Judul", "Kategori", "Action"];

export default function TablePage() {
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [currentData, setCurrentData] = React.useState({
    _id: "",
    username: "",
    email: "",
    nama_buku: "",
    kategori_buku: "",
    deskripsi_buku: "",
  });
  const [active, setActive] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useGetPeminjam({
    limit: 10,
    page: page,
    search: "",
  });

  console.log(data);

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
            {data?.data?.map((item: any, index: number) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.username}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.email}
                  </Typography>
                </td>
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
                    {item.deskripsi_buku}
                  </Typography>
                </td>
                <td className="p-4 flex gap-2">
                  <div>
                    <Typography
                      onClick={() => {
                        console.log(item);
                        setCurrentData(item);
                        setOpenApprove(true);
                      }}
                      variant="small"
                      color="blue-gray"
                      className="font-medium cursor-pointer bg-green-600 p-2 rounded-lg text-white"
                    >
                      Approve
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      onClick={() => {
                        setCurrentData(item);
                        setOpenReject(true);
                      }}
                      variant="small"
                      color="blue-gray"
                      className="font-medium cursor-pointer bg-red-600 p-2 rounded-lg text-white"
                    >
                      Reject
                    </Typography>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Confirm open={openConfirm} setOpen={setOpenConfirm} data={currentData} />
      <Approve open={openApprove} setOpen={setOpenApprove} data={currentData} />
      <Reject open={openReject} setOpen={setOpenReject} data={currentData} />
    </div>
  );
}
