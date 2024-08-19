"use client";

import {
  Button,
  Card,
  Typography,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import React from "react";
import useGetHistory from "@/hooks/pinjam/useGetHistory";

const TABLE_HEAD = ["Username", "Email", "Judul", "Pesan Admin", "Status"];

export default function TablePage() {
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");

  const { data, isLoading } = useGetHistory({
    limit: 10,
    page: page,
    search: "",
    status: status,
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
            <Option value="returned">Returned</Option>
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
                      className={`font-medium ${
                        item.status === "pending"
                          ? "bg-yellow-800"
                          : item.status === "approved"
                          ? "bg-green-600"
                          : item.status === "returned"
                          ? "bg-purple-400"
                          : "bg-red-600"
                      } p-2 rounded-lg text-white`}
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
    </div>
  );
}
