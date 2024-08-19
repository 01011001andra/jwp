"use client";

import { useAuth } from "@/store/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const TenstackProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { setLogOut, loginResponse } = useAuth();

  axios.defaults.baseURL = `http://localhost:5000`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${loginResponse?.token}`;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Anda tidak punya akses, silahkan login kembali!", {
          id: "error 401",
        });
        setLogOut();
        router.push(`/login`);
      }
      return Promise.reject(error);
    }
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TenstackProvider;
