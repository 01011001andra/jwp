import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Typography,
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

const Reject: React.FC<Props> = ({ open, setOpen, data }) => {
  const [message, setMessage] = React.useState("");

  const handleClose = () => setOpen(!open);
  const mutation = useSetAction();

  const handleReject = () => {
    mutation
      .mutateAsync({
        id: data._id,
        status: "rejected",
        pesan: message,
      })
      .then((res) => {
        handleClose();
        toast.success("Berhasil reject buku");
      })
      .catch((err) => {
        toast.error("Gagal reject buku");
        handleClose();
      });
  };

  return (
    <>
      <Dialog open={open} handler={handleClose} size="sm">
        <DialogHeader>Perhatian!</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Typography>
            Reject buku {data.nama_buku} dari {data.username}?
          </Typography>
          <div className="w-full">
            <Textarea
              label="Pesan"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
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
          <Button variant="gradient" color="red" onClick={handleReject}>
            <span>Reject</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Reject;
