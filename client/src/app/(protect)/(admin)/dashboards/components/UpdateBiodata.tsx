"use client";

import React from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useUpdatePassword } from "@/hooks/auth/useUpdatePassword";
import { useAuth } from "@/store/useAuth";
import { useUpdateIdentifier } from "@/hooks/auth/useUpdateIdentifier";

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

const UpdateBiodata: React.FC<Props> = ({ open, setOpen, data }) => {
  const [passwordMode, setPasswordMode] = React.useState(false);
  const { loginResponse, setLoginResponse } = useAuth();
  const updateIndentifier = useUpdateIdentifier();

  const [identifier, setIdentifier] = React.useState({
    username: loginResponse?.username,
    email: loginResponse?.email,
  });
  const [password, setPassword] = React.useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = React.useState<string>("");
  const updatePassword = useUpdatePassword();

  const handleOpen = () => {};
  const handleClose = () => {
    setOpen(false);
    setError("");
    setPassword({ oldPassword: "", newPassword: "" });
    setPasswordMode(false);
  };

  const handleUpdatePassword = () => {
    updatePassword
      .mutateAsync({
        username: loginResponse?.username,
        newPassword: password.newPassword,
        oldPassword: password.oldPassword,
      })
      .then((res) => {
        toast.success("Berhasil mengubah password!");
        handleClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleUpdateIdentifier = () => {
    updateIndentifier
      .mutateAsync({
        id: loginResponse?.id,
        username: identifier.username,
        email: identifier.email,
      })
      .then((res) => {
        setLoginResponse({
          ...loginResponse,
          username: res.data.username,
          email: res.data.email,
        });
        toast.success("Berhasil mengubah biodata!");
        handleClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        {passwordMode ? (
          <>
            <DialogHeader className="relative m-0 block">
              <Typography
                variant="h4"
                color="blue-gray"
                className="flex gap-2 flex-col"
              >
                Update password
                <small className="text-red-600 text-xs">{error}</small>
              </Typography>
              <small
                className="text-xs  cursor-pointer"
                onClick={() => {
                  setError("");
                  setPasswordMode(!passwordMode);
                }}
              >
                Ubah biodata?
              </small>
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
                  Password lama
                </Typography>
                <Input
                  crossOrigin={"anonymous"}
                  onChange={(e) =>
                    setPassword({ ...password, oldPassword: e.target.value })
                  }
                  value={password.oldPassword}
                  color="gray"
                  size="lg"
                  placeholder="Password lama"
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
                  Password baru
                </Typography>
                <Input
                  crossOrigin={"anonymous"}
                  onChange={(e) =>
                    setPassword({ ...password, newPassword: e.target.value })
                  }
                  value={password.newPassword}
                  color="gray"
                  size="lg"
                  placeholder="Password baru"
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
            </DialogBody>
            <DialogFooter>
              <Button className="ml-auto" onClick={handleUpdatePassword}>
                Ubah password
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="relative m-0 block">
              <Typography
                variant="h4"
                color="blue-gray"
                className="flex gap-2 flex-col"
              >
                Update biodata
                <small className="text-red-600 text-xs">{error}</small>
              </Typography>
              <Typography className="mt-1 font-normal text-gray-600">
                Detail biodata
              </Typography>
              <small
                className="text-xs  cursor-pointer"
                onClick={() => {
                  setError("");
                  setPasswordMode(!passwordMode);
                }}
              >
                Ubah password?
              </small>
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
                  Username
                </Typography>
                <Input
                  crossOrigin={"anonymous"}
                  onChange={(e) =>
                    setIdentifier({ ...identifier, username: e.target.value })
                  }
                  value={identifier.username}
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
                  Email
                </Typography>
                <Input
                  crossOrigin={"anonymous"}
                  onChange={(e) =>
                    setIdentifier({ ...identifier, email: e.target.value })
                  }
                  color="gray"
                  value={identifier.email}
                  size="lg"
                  placeholder="eg. White Shoes"
                  name="Username"
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button className="ml-auto" onClick={handleUpdateIdentifier}>
                Update biodata
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
};
export default UpdateBiodata;
