import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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

const Confirm: React.FC<Props> = ({ open, setOpen, data }) => {
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Perhatian!</DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus buku ini?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Confirm;
