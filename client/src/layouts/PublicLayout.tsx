"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
interface Props {
  children: React.ReactNode;
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  const { loginResponse } = useAuth();
  const router = useRouter();
  useLayoutEffect(() => {
    if (loginResponse?.role === "user") {
      return router.push("/dashboard");
    }
    if (loginResponse?.role === "admin") {
      return router.push("/dashboards");
    }
  }, [loginResponse]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default PublicLayout;
