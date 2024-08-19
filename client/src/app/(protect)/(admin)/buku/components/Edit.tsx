"use client";

import React from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useUpdateBuku } from "@/hooks/buku/useUpdateBuku";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: string;
    nama: string;
    kategori: string;
    deskripsi: string;
  };
}

const Edit: React.FC<Props> = ({ open, setOpen, data }) => {
  const [nama, setNama] = React.useState("");
  const [kategori, setKategori] = React.useState("");
  const [deskripsi, setDeskripsi] = React.useState("");
  const [error, setError] = React.useState<string>("");
  const mutation = useUpdateBuku();

  const handleOpen = () => {};
  const handleClose = () => {
    setOpen(false);
    setError("");
    setDeskripsi("");
    setKategori("");
    setNama("");
  };

  const handleSubmit = () => {
    if (!nama || !kategori) {
      setError("Semua kolom harus diisi");
      return;
    }

    mutation
      .mutateAsync({ id: data?.id, nama, kategori, deskripsi })
      .then((res) => {
        handleClose();
        toast.success("Berhasil mengubah data");
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      });
  };
  React.useEffect(() => {
    setNama(data?.nama);
    setKategori(data?.kategori);
    setDeskripsi(data?.deskripsi);
  }, [data]);
  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Buku
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Edit detail buku
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Nama
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              onChange={(e) => setNama(e.target.value)}
              value={nama}
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-black"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Kategori
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              onChange={(e) => setKategori(e.target.value)}
              color="gray"
              value={kategori}
              size="lg"
              placeholder="eg. White Shoes"
              name="kategori"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Deskripsi (Opsional)
            </Typography>
            <Textarea
              rows={7}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi buku"
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            Edit Buku
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Edit;
