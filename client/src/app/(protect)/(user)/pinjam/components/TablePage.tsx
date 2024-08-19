"use client";

import {
  Button,
  Card,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import React from "react";
import Confirm from "./Confirm";
import { useAuth } from "@/store/useAuth";
import useGetPinjam from "@/hooks/pinjam/useGetPinjam";
import { Select, Option } from "@material-tailwind/react";
import PulsatingButton from "@/components/PulsatingButton";
import Return from "./Return";

const TABLE_HEAD = ["Nama", "Kategori", "Pesan", "Status"];

const TABLE_ROWS = [
  {
    nama: "John Michael",
    kategori: "Manager",
    deskripsi: "Manager",
  },
  {
    nama: "Alexa Liras",
    kategori: "Developer",
    deskripsi: "Developer",
  },
  {
    nama: "Laurent Perrier",
    kategori: "Executive",
    deskripsi: "Executive",
  },
  {
    nama: "Michael Levi",
    kategori: "Developer",
    deskripsi: "Developer",
  },
  {
    nama: "Richard Gran",
    kategori: "Manager",
    deskripsi: "Manager",
  },
];

export default function TablePage() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const { loginResponse } = useAuth();

  const { data, isLoading } = useGetPinjam({
    limit: 10,
    page: page,
    search: "",
    username: loginResponse?.username,
    status,
  });

  const [openReturn, setOpenReturn] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentData, setCurrentData] = React.useState({
    _id: "",
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
        <div className="w-72">
          <Select
            label="Pilih status"
            onChange={(e) => {
              setPage(1);
              setStatus(e || "");
            }}
          >
            {/* <Option></Option> */}
            <Option value="">All</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </div>
      </div>
      <Card className="h-full w-full overflow-x-auto ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                    ["Pesan", "Status"].includes(head) && "text-center"
                  }`}
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
                  <Tooltip content={item.pesan ? item.pesan : "-"}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal truncate text-center"
                    >
                      {item.pesan ? item.pesan : "-"}
                    </Typography>
                  </Tooltip>
                </td>
                <td className="p-4 flex gap-2 items-center justify-center">
                  <div>
                    {item.status === "pending" ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`p-2 text-xs uppercase text-white font-bold rounded-lg bg-yellow-800`}
                      >
                        {item.status}
                      </Typography>
                    ) : item.status === "rejected" ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`p-2 text-xs uppercase text-white font-bold rounded-lg bg-red-800`}
                      >
                        {item.status}
                      </Typography>
                    ) : (
                      <PulsatingButton
                        onClick={() => {
                          setCurrentData(item);
                          setOpenReturn(true);
                        }}
                        className="bg-green-600 p-1"
                        pulseColor="green"
                      >
                        Approved
                      </PulsatingButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Confirm open={openConfirm} setOpen={setOpenConfirm} data={currentData} />
      <Return open={openReturn} setOpen={setOpenReturn} data={currentData} />
    </div>
  );
}
