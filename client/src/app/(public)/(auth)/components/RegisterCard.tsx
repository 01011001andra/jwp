"use client";

import React from "react";

// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/auth/useRegister";
import toast from "react-hot-toast";
import { useAuth } from "@/store/useAuth";

function RegisterCard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const mutation = useRegister();
  const { loginResponse, setLoginResponse } = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email as string;
    const username = formJson.username as string;
    const password = formJson.password as string;
    const toastId = toast.loading("Loading...");
    mutation
      .mutateAsync({ email, username, password })
      .then((res) => {
        toast.success("Success register");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(`Gagal register: ${err.response.data.message}`);
        console.error(err);
      })
      .finally(() => toast.remove(toastId));
  };
  return (
    <section className="px-8">
      <div className="container min-h-screen mx-auto grid place-items-center">
        <Card
          shadow={false}
          className="md:px-24 md:py-14 py-8 border border-gray-300 "
        >
          <CardHeader shadow={false} floated={false} className="text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:text-4xl cursor-pointer"
              onClick={() => router.push("/")}
            >
              e-Borrow
            </Typography>
            <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
              Register agar bisa meminjam buku
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
              <div>
                <label htmlFor="username">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Username
                  </Typography>
                </label>
                <Input
                  crossOrigin={"anonymous"}
                  id="username"
                  color="gray"
                  size="lg"
                  type="text"
                  name="username"
                  placeholder="01011001andra"
                  className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Email
                  </Typography>
                </label>
                <Input
                  crossOrigin={"anonymous"}
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Password
                  </Typography>
                </label>
                <div className="w-full relative flex items-center justify-end">
                  <Input
                    crossOrigin={"anonymous"}
                    id="password"
                    color="gray"
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="****"
                    className="w-full placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-6 absolute cursor-pointer right-3 ${
                      !showPassword && "hidden"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-6 absolute cursor-pointer right-3 ${
                      showPassword && "hidden"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full flex items-end justify-end cursor-pointer">
                <small
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Sudah punya akun?
                </small>
              </div>
              <Button size="lg" color="gray" fullWidth type="submit">
                Register
              </Button>
              <Typography
                variant="small"
                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
              >
                Setelah masuk, Anda setuju untuk mengikuti{" "}
                <a href="#" className="text-gray-900">
                  Syarat dan Ketentuan
                </a>{" "}
                &{" "}
                <a href="#" className="text-gray-900">
                  Kebijakan Privasi.
                </a>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default RegisterCard;
