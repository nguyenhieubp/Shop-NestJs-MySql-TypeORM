import React from "react";
import Dashboard from "./Dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      <div className=" fixed top-0 left-0 w-[30rem] bg-blue-600 h-[100vh]">
        <Dashboard></Dashboard>
      </div>
      <div className="pl-[30rem]">{children}</div>
    </div>
  );
};

export default Layout;
