"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const { loginResponse } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!loginResponse) return router.push("/");

    if (loginResponse?.role === "user") {
      return router.push("/dashboard");
    }
  }, [loginResponse]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AdminLayout;
