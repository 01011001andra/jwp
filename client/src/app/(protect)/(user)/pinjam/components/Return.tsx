import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSetAction } from "@/hooks/pinjam/useSetAction";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    _id: string;
    username: string;
    email: string;
    nama_buku: string;
    kategori_buku: string;
    deskripsi_buku: string;
  };
}

const Return: React.FC<Props> = ({ open, setOpen, data }) => {
  const mutation = useSetAction();

  const handleClose = () => setOpen(!open);

  const handleReturn = () => {
    mutation
      .mutateAsync({ id: data._id, status: "returned" })
      .then((res) => {
        handleClose();
        toast.success("Berhasil return buku");
      })
      .catch((err) => {
        toast.error("Gagal return buku");
        handleClose();
      });
  };
  return (
    <>
      <Dialog open={open} handler={handleClose} size="sm">
        <DialogHeader>Perhatian!</DialogHeader>
        <DialogBody>
          Apakah anda yakin ingin mengembalikan buku {data?.nama_buku}?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleReturn}>
            <span>Kembalikan</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Return;
