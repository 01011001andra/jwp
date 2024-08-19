import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDeleteBuku } from "@/hooks/buku/useDeleteBuku";
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

const Confirm: React.FC<Props> = ({ open, setOpen, data }) => {
  const handleOpen = () => setOpen(!open);
  const mutation = useDeleteBuku();

  const handleDelete = () => {
    mutation
      .mutateAsync({ id: data?.id })
      .then((res) => {
        setOpen(false);
        toast.success("Berhasil menghapus data");
      })
      .catch((err) => {});
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Perhatian!</DialogHeader>
        <DialogBody>
          Apakah anda yakin ingin menghapus buku {data?.nama}?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Confirm;
