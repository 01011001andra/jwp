import React from "react";
import UserLayout from "@/layouts/UserLayout";
import Sidebar from "./components/Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <UserLayout>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </UserLayout>
  );
};

export default Layout;
